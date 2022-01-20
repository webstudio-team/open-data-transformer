import { config as defaultConfig } from "./config";
import "./App.css";

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
import FormComponent from "./FormComponent";

streamSaver.WritableStream = ponyfill.WritableStream;

export default function OpenDataTransformerApp() {
  const [formData, setFormData] = useState({
    encoding: "win1250",
    delimiter: ";",
    overrideHeaders: false,
  });
  const [headerData, setHeaderData] = useState([]);
  const [columnData, setColumnData] = useState([]);

  const inputRef = useRef();

  function getConfig() {
    //todo construct from state/form values
  }

  function createWriter(filename) {
    return streamSaver.createWriteStream(filename).getWriter();
  }

  function handleDownloadCsv() {
    const config = getConfig();

    if (config == null) {
      return;
    }

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

    if (config == null) {
      return;
    }

    const schema = csvSchemaGenerator.generate(config);
    const writer = createWriter(config.filename + "-metadata.json");
    writer.write(new TextEncoder().encode(JSON.stringify(schema, null, 4)));
    writer.close();
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,

      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    getFirstRow();
  };

  function getFirstRow() {
    const file = inputRef.current.files[0];

    const reader = (file) => fileReaderStream(file);
    const decoder = () => {
      iconv.enableStreamingAPI(stream);
      return iconv.decodeStream(formData.encoding);
    };
    const parser = createParser(formData, parse);

    let firstRow = [];
    reader(file)
      .pipe(decoder())
      .pipe(parser)
      .on("readable", function () {
        if (firstRow.length !== 0) {
          return;
        }
        let row = this.read();
        firstRow = row;
        setHeaderData(firstRow);

        let columnsState = [];
        firstRow.forEach((value, index) => {
          columnsState[index] = {
            name: value,
            datatype: "string",
            description: "",
          };
        });
        setColumnData(columnsState);
      });
  }

  function setColumnState(index, payload) {
    let oldState = columnData;
    let newColumnState = {
      ...oldState[index],
      ...payload,
    };
    let newState = oldState;
    newState[index] = newColumnState;
    setColumnData(newState);
  }

  return (
    <div>
      <h1>Open Data Transformer</h1>

      <form onSubmit={handleSubmit}>
        <select onChange={handleChange} name="encoding" id="encoding">
          <option value="win1250">win1250</option>
        </select>
        <select onChange={handleChange} name="delimiter" id="delimiter">
          <option value=";">;</option>
        </select>
        <input type="submit" value="Submit" />
      </form>

      {!!columnData.length && <div>Columns data</div>}
      {!!columnData.length &&
        columnData.map((item, index) => {
          return (
            <FormComponent
              index={index}
              headerData={item.name}
              key={index}
              handleChange={setColumnState}
            />
          );
        })}
      <p>
        <input type="file" ref={inputRef} />
      </p>
      <p>
        <button onClick={handleDownloadCsv}>Download csv</button>
      </p>
      <p>
        <button onClick={handleDownloadMetadata}>Download metadata</button>
      </p>
      <p>
        Don't forget to{" "}
        <a href="https://csvw.opendata.cz/" target="_blank" rel={"noreferrer"}>
          validate
        </a>{" "}
        your dataset...
      </p>
    </div>
  );
}
