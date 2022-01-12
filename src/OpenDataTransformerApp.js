import { config as defaultConfig } from "./config";

import { useRef } from "react";
import fileReaderStream from "filereader-stream";
import iconv from "iconv-lite";
import stream from "stream-browserify";
import { parse } from "csv-parse/dist/esm/index.js";
import { createParser } from "./modules/parser";
import { createTransformer } from "./modules/transformer";
import { transform } from "stream-transform/dist/esm/index.js";
import csvSchemaGenerator from "./modules/csvSchemaGenerator";

export default function OpenDataTransformerApp() {
  const configRef = useRef();

  function getConfig() {
    try {
      return JSON.parse(configRef.current.value);
    } catch (err) {
      console.log("Textarea input is not valid JSON.");
      return null;
    }
  }

  function handleInputChange(e) {
    const config = getConfig();

    if (config == null) {
      return;
    }

    const file = e.target.files[0];

    const reader = (file) => fileReaderStream(file);
    const decoder = () => {
      iconv.enableStreamingAPI(stream);
      return iconv.decodeStream(config.encoding);
    };
    const parser = createParser(config, parse);
    const transformer = createTransformer(config, transform);

    reader(file)
      .pipe(decoder())
      .pipe(parser)
      .pipe(transformer)
      //todo create writer
      .on("readable", function () {
        let row;
        while ((row = transformer.read()) !== null) {
          console.log(row);
        }
      });

    const schema = csvSchemaGenerator.generate(config);
    console.log(schema); //todo write to file
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
        <input type="file" onChange={handleInputChange} />
      </p>
    </div>
  );
}
