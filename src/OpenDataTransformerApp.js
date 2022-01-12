import { config } from "./config";

import fileReaderStream from "filereader-stream";
import iconv from "iconv-lite";
import stream from "stream-browserify";
import { parse } from "csv-parse/dist/esm/index.js";
import { createParser } from "./modules/parser";
import { createTransformer } from "./modules/transformer";
import { transform } from "stream-transform/dist/esm/index.js";

export default function OpenDataTransformerApp() {
  const reader = (file) => fileReaderStream(file);
  const decoder = () => {
    iconv.enableStreamingAPI(stream);
    return iconv.decodeStream(config.encoding);
  };
  const parser = createParser(config, parse);
  const transformer = createTransformer(config, transform);

  function handleInputChange(e) {
    const file = e.target.files[0];
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
  }

  return (
    <div>
      <h1>Open Data Transformer</h1>
      <p>
        <input type="file" onChange={handleInputChange} />
      </p>
    </div>
  );
}
