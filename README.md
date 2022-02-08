# Open Data Transformer

Data transformation tool for generating CSV datasets conforming
to [RFC 4180](https://datatracker.ietf.org/doc/html/rfc4180)
, [CSV on the Web (CSVW)](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217)
and [OFN - Základní datové typy](https://ofn.gov.cz/z%C3%A1kladn%C3%AD-datov%C3%A9-typy/2020-07-01).

- originally built as command line utility
- extended to web app based on [Create React App](https://github.com/facebook/create-react-app)

## Features

- data processing runs on user machine
- supports converting `utf8` and `win1250` (MS Excel) encoded docs
- based on [node-csv](https://github.com/adaltas/node-csv), [csv-writer](https://github.com/ryu1kn/csv-writer)
- supported data types: `string`, `integer`, `float`, `boolean`

## Install

```
yarn
```

## CLI Usage

```
cp src/config.js.example src/config.js
node cli input.csv
```

## CRA

### Development

```
yarn start
```

### Build

```
yarn build
```

## Demo
https://webstudio-team.github.io/open-data-transformer