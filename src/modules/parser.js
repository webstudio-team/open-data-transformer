const { parse } = require("csv-parse");

function getParserConfig(config) {
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

function createParser(config, parser = parse) {
  return parser(getParserConfig(config));
}

exports.createParser = createParser;
