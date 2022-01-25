import "./App.css";
import "./ODT.css";

import { useRef } from "react";
import { useState } from "react";
import fileReaderStream from "filereader-stream";
import iconv from "iconv-lite";
import stream from "stream-browserify";
import { parse } from "csv-parse/dist/esm/index.js";
import { createParser } from "./modules/parser";
import { createTransformer } from "./modules/transformer";
import { transform } from "stream-transform/dist/esm/index.js";
import * as ponyfill from "web-streams-polyfill/ponyfill";
import streamSaver from "streamsaver";
import csvSchemaGenerator from "./modules/csvSchemaGenerator";
import ColumnForm from "./ColumnForm";
import CsvPicker from "./CsvPicker";
import DatasetMetadataForm from "./DatasetMetadataForm";

streamSaver.WritableStream = ponyfill.WritableStream;

export default function OpenDataTransformerApp() {
  const [encoding, setEncoding] = useState();
  const [delimiter, setDelimiter] = useState();
  const [datasetMetadata, setDatasetMetadata] = useState({
    title: "",
    description: "",
    filename: "",
    source: "",
  });
  const [tags, setTags] = useState([]);
  const [columnsMetadata, setColumnsMetadata] = useState([]);

  const inputRef = useRef();

  function getConfig() {
    return {
      encoding: encoding,
      delimiter: delimiter,
      overrideHeaders: true,
      ...datasetMetadata,
      keywords: tags,
      columns: columnsMetadata,
    };
  }

  function createWriter(filename) {
    return streamSaver.createWriteStream(filename).getWriter();
  }

  function handleDownloadCsv() {
    const config = getConfig();

    const file = inputRef.current.files[0];

    if (file === undefined) {
      console.log("Please select file.");
      return;
    }

    const reader = (file) => fileReaderStream(file);
    const decoder = () => {
      iconv.enableStreamingAPI(stream);
      return iconv.decodeStream(config.encoding);
    };
    const parser = createParser(config, parse);
    const transformer = createTransformer(config, transform);
    const writer = createWriter(config.filename);

    reader(file)
      .pipe(decoder())
      .pipe(parser)
      .pipe(transformer)
      .on("readable", function () {
        let row;
        while ((row = transformer.read()) !== null) {
          writer.write(new TextEncoder().encode(row));
        }
      })
      .on("finish", function () {
        writer.close();
      });
  }

  function handleDownloadMetadata() {
    const config = getConfig();

    const schema = csvSchemaGenerator.generate(config);
    const writer = createWriter(config.filename + "-metadata.json");
    writer.write(new TextEncoder().encode(JSON.stringify(schema, null, 4)));
    writer.close();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loadCsvHeaders();
  };

  function loadCsvHeaders() {
    const file = inputRef.current.files[0];

    if (file === undefined) {
      console.log("Please select file.");
      return;
    }

    const reader = (file) => fileReaderStream(file);
    const decoder = () => {
      iconv.enableStreamingAPI(stream);
      return iconv.decodeStream(encoding);
    };
    const parser = createParser(
      { delimiter: delimiter, overrideHeaders: false },
      parse
    );

    let headers = [];
    reader(file)
      .pipe(decoder())
      .pipe(parser)
      .on("readable", () => {
        if (headers.length !== 0) {
          return;
        }

        headers = parser.read();
        let columnsData = [];
        headers.forEach((value, index) => {
          columnsData[index] = {
            name: value,
            datatype: "string",
            description: "",
          };
        });
        setColumnsMetadata(columnsData);
      });
  }

  function setColumnState(index, payload) {
    let oldState = columnsMetadata;
    let newColumnState = {
      ...oldState[index],
      ...payload,
    };
    let newState = oldState;
    newState[index] = newColumnState;
    setColumnsMetadata(newState);
  }

  return (
    <div className="container">
      <h1>Open Data Transformer</h1>

      <form onSubmit={handleSubmit}>
        <CsvPicker
          inputRef={inputRef}
          setEncoding={setEncoding}
          setDelimiter={setDelimiter}
        />
        {!!columnsMetadata.length && (
          <div>
            <h2>File's data</h2>
          </div>
        )}
        {!!columnsMetadata.length && (
          <DatasetMetadataForm
            datasetMetadata={datasetMetadata}
            setDatasetMetadata={setDatasetMetadata}
            tags={tags}
            setTags={setTags}
          />
        )}
        {!!columnsMetadata.length && (
          <div>
            <h2>Columns data</h2>
          </div>
        )}
        {!!columnsMetadata.length &&
          columnsMetadata.map((item, index) => {
            return (
              <ColumnForm
                index={index}
                columnName={item.name}
                key={index}
                handleChange={setColumnState}
              />
            );
          })}
      </form>
      {!!columnsMetadata.length && (
        <>
          <p>
            <button onClick={handleDownloadCsv}>Download csv</button>
          </p>
          <p>
            <button onClick={handleDownloadMetadata}>Download metadata</button>
          </p>
          <p>
            Don't forget to{" "}
            <a
              href="https://csvw.opendata.cz/"
              target="_blank"
              rel={"noreferrer"}
            >
              validate
            </a>{" "}
            your dataset...
          </p>
        </>
      )}
    </div>
  );
}
