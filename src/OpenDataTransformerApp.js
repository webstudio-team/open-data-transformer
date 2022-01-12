import { config as defaultConfig } from "./config";

import { useRef } from "react";
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
streamSaver.WritableStream = ponyfill.WritableStream;

export default function OpenDataTransformerApp() {
  const configRef = useRef();
  const inputRef = useRef();

  function getConfig() {
    try {
      return JSON.parse(configRef.current.value);
    } catch (err) {
      console.log("Textarea input is not valid JSON.");
      return null;
    }
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

  return (
    <div>
      <h1>Open Data Transformer</h1>
      <p>
        <textarea
          ref={configRef}
          defaultValue={JSON.stringify(defaultConfig, null, 2)}
          aria-label="Ugliest form ever"
          style={{ width: 500, height: 300 }}
        />
      </p>
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
