const config = require("./config.json");
const fs = require("fs");
const { parse } = require("csv-parse");
const iconv = require("iconv-lite");
const { transform } = require("stream-transform");
const createCsvStringifier = require("csv-writer").createArrayCsvStringifier;

function getInputFilename() {
  const inputFilename = process.argv.slice(2)[0];

  if (inputFilename === undefined) {
    throw new Error("Missing input filename.");
  }

  return inputFilename;
}

function getReaderEncoding() {
  return config.encoding;
}

function getParserConfig() {
  let conf = {
    delimiter: config.delimiter,
  };

  if (config.overrideHeaders) {
    conf.on_record = function (record, context) {
      if (context.lines === 1) {
        return Object.values(config.columns).map((column) => column.name);
      }

      return record;
    };
  }

  return conf;
}

function getStringifierConfig() {
  return {
    recordDelimiter: "\r\n",
  };
}

function readCsv(filename) {
  return fs
    .createReadStream(filename)
    .pipe(iconv.decodeStream(getReaderEncoding()))
    .pipe(parse(getParserConfig()));
}

const transformer = () => {
  const stringifier = createCsvStringifier(getStringifierConfig());

  return transform((data) => {
    return stringifier.stringifyRecords([data]);
  });
};

const writer = fs.createWriteStream(config.filename);

function run() {
  readCsv(getInputFilename()).pipe(transformer()).pipe(writer);
}

run();