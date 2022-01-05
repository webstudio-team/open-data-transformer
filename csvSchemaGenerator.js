const config = require("./config.json");
const fs = require("fs");

function generateSchemaColumns() {
  return config.columns.map((column) => {
    return {
      name: column.name,
      titles: column.name,
      datatype: column.datatype,
      "dc:description": column.description,
    };
  });
}

function generate() {
  const schema = {
    "@context": [
      "http://www.w3.org/ns/csvw",
      {
        "@language": "cs",
      },
    ],
    url: config.filename,
    "dc:title": config.title,
    "dc:description": config.description,
    "dc:source": config.source,
    "dcat:keyword": config.keywords,
    "dc:publisher": {
      "schema:name": "\u00daZIS \u010cR",
      "schema:url": {
        "@id": "https://www.uzis.cz/",
      },
    },
    "dc:license": {
      "@id":
        "https://data.gov.cz/podm\u00ednky-u\u017eit\u00ed/voln\u00fd-p\u0159\u00edstup/",
    },
    "dc:modified": {
      "@value": new Date().toISOString(),
      "@type": "xsd:dateTime",
    },
    tableSchema: {
      columns: generateSchemaColumns(),
    },
  };

  fs.writeFile(
    `${config.filename}-metadata.json`,
    JSON.stringify(schema, 0, 4),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

module.exports = {
  generate: generate,
};
