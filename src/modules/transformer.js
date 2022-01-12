const createCsvStringifier = require("csv-writer").createArrayCsvStringifier;
const { transform } = require("stream-transform");

const allowedDatatypes = ["string", "integer", "float", "boolean"];

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
    default:
      return value;
  }
}

function createTransformer(config, transformer = transform) {
  const stringifier = createCsvStringifier(getStringifierConfig());
  const datatypes = Object.values(config.columns).map(
    (column) => column.datatype
  );
  let counter = 0;

  return transformer((data) => {
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
}

exports.createTransformer = createTransformer;
