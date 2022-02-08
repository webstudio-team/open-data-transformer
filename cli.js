const { config } = require("./src/config.js");

const fs = require("fs");
const iconv = require("iconv-lite");
const { createParser } = require("./src/modules/parser.js");
const { createTransformer } = require("./src/modules/transformer");
const csvSchemaGenerator = require("./src/modules/csvSchemaGenerator");

function getInputFilename() {
  const inputFilename = process.argv.slice(2)[0];

  if (inputFilename === undefined) {
    throw new Error("Missing input filename.");
  }

  return inputFilename;
}

const reader = fs.createReadStream(getInputFilename());
const decoder = iconv.decodeStream(config.encoding);
const parser = createParser(config);
const transformer = createTransformer(config);
const writer = fs.createWriteStream(config.filename);

function run() {
  console.log("Generating csv...");
  reader.pipe(decoder).pipe(parser).pipe(transformer).pipe(writer);
  console.log("Generating schema...");
  const schemaFilename = config.filename + "-metadata.json";
  fs.writeFile(
    schemaFilename,
    JSON.stringify(csvSchemaGenerator.generate(config), 0, 4),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  console.log(`Dataset generated: ${config.filename}`);
  console.log(`Schema generated: ${schemaFilename}`);
  console.log("Done!");
}

run();
