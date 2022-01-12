const fs = require("fs");
const { parse } = require("csv-parse");
const iconv = require("iconv-lite");
const { transform } = require("stream-transform");
const createCsvStringifier = require("csv-writer").createArrayCsvStringifier;
const allowedDatatypes = ["string", "integer", "float", "boolean"];

const { config } = require("./config.js");
const csvSchemaGenerator = require("./csvSchemaGenerator");

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

function parseValue(value, datatype) {
  if (!allowedDatatypes.includes(datatype)) {
    throw new Error(`Datatype ${datatype} is not allowed or valid.`);
  }

  switch (datatype) {
    case "string":
      return value;
    case "integer":
      return parseInt(value);
    case "float":
      return parseFloat(value);
    case "boolean":
      return [1, "1", true, "true"].includes(value) ? 1 : 0;
  }
}

const reader = fs.createReadStream(getInputFilename());

const decoder = iconv.decodeStream(getReaderEncoding());

const parser = parse(getParserConfig());

const transformer = () => {
  const stringifier = createCsvStringifier(getStringifierConfig());
  const datatypes = Object.values(config.columns).map(
    (column) => column.datatype
  );
  let counter = 0;

  return transform((data) => {
    counter++;
    let parsedValues = [];

    if (counter === 1) {
      //prevent parsing headers
      parsedValues = data;
    } else {
      data.forEach((value, index) => {
        const datatype = datatypes[index];
        parsedValues.push(parseValue(value, datatype));
      });
    }

    return stringifier.stringifyRecords([parsedValues]);
  });
};

const writer = fs.createWriteStream(config.filename);

function run() {
  console.log("Generating csv...");
  reader.pipe(decoder).pipe(parser).pipe(transformer()).pipe(writer);
  console.log("Generating schema...");
  fs.writeFile(
    `${config.filename}-metadata.json`,
    JSON.stringify(csvSchemaGenerator.generate(config), 0, 4),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  console.log("Done!");
}

run();
