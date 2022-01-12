function generateSchemaColumns(columns) {
  return columns.map((column) => {
    return {
      name: column.name,
      titles: column.name,
      datatype: column.datatype,
      "dc:description": column.description,
    };
  });
}

function generate(config) {
  return {
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
      columns: generateSchemaColumns(config.columns),
    },
  };
}

module.exports = {
  generate: generate,
};
