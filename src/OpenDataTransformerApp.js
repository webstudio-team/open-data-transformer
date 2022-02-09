import "./assets/scss/_app.scss";
import "./assets/scss/_footer.scss";

import download from "./assets/images/download.svg";
import downloadIcon from "./assets/images/download-icon.svg";

import logoMzcr from "./assets/images/logo-data-mzcr.svg";
import logoUzis from "./assets/images/logo-uzis.svg";
import logoMu from "./assets/images/logo-iba-mu.svg";
import logoWebStudio from "./assets/images/web_studio.svg";

import { useRef } from "react";
import { useState } from "react";
import fileReaderStream from "filereader-stream";
import iconv from "iconv-lite";
import stream from "stream-browserify";
import { parse } from "csv-parse/dist/esm/index.js";
import { createParser } from "./modules/parser";
import { createTransformer } from "./modules/transformer";
import { transform } from "stream-transform/dist/esm/index.js";
import * as ponyfill from "web-streams-polyfill/ponyfill";
import streamSaver from "streamsaver";
import csvSchemaGenerator from "./modules/csvSchemaGenerator";
import ColumnForm from "./ColumnForm";
import CsvPicker from "./CsvPicker";
import DatasetMetadataForm from "./DatasetMetadataForm";
import DragAndDrop from "./DragAndDrop";
import Button from "./Button";

streamSaver.WritableStream = ponyfill.WritableStream;

export default function OpenDataTransformerApp() {
  const [encoding, setEncoding] = useState();
  const [delimiter, setDelimiter] = useState();
  const [datasetMetadata, setDatasetMetadata] = useState({
    title: "",
    description: "",
    filename: "",
    source: "",
  });
  const [tags, setTags] = useState([]);
  const [columnsMetadata, setColumnsMetadata] = useState([]);
  const [file, setFile] = useState();

  const inputRef = useRef();

  function getConfig() {
    return {
      encoding: encoding,
      delimiter: delimiter,
      overrideHeaders: true,
      ...datasetMetadata,
      keywords: tags,
      columns: columnsMetadata,
    };
  }

  function createWriter(filename) {
    return streamSaver.createWriteStream(filename).getWriter();
  }

  function handleDownloadCsv() {
    const config = getConfig();

    if (file === undefined) {
      console.log("Please select file.");
      return;
    }

    const reader = (file) => fileReaderStream(file);
    const decoder = () => {
      iconv.enableStreamingAPI(stream);
      return iconv.decodeStream(config.encoding);
    };
    const parser = createParser(config, parse);
    const transformer = createTransformer(config, transform);
    const writer = createWriter(config.filename);

    reader(file)
      .pipe(decoder())
      .pipe(parser)
      .pipe(transformer)
      .on("readable", function () {
        let row;
        while ((row = transformer.read()) !== null) {
          writer.write(new TextEncoder().encode(row));
        }
      })
      .on("finish", function () {
        writer.close();
      });
  }

  function handleDownloadMetadata() {
    const config = getConfig();

    const schema = csvSchemaGenerator.generate(config);
    const writer = createWriter(config.filename + "-metadata.json");
    writer.write(new TextEncoder().encode(JSON.stringify(schema, null, 4)));
    writer.close();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loadCsvHeaders();
  };

  function loadCsvHeaders() {
    if (file === undefined) {
      console.log("Please select file.");
      return;
    }

    const reader = (file) => fileReaderStream(file);
    const decoder = () => {
      iconv.enableStreamingAPI(stream);
      return iconv.decodeStream(encoding);
    };
    const parser = createParser(
      { delimiter: delimiter, overrideHeaders: false },
      parse
    );

    let headers = [];
    reader(file)
      .pipe(decoder())
      .pipe(parser)
      .on("readable", () => {
        if (headers.length !== 0) {
          return;
        }

        headers = parser.read();
        let columnsData = [];
        headers.forEach((value, index) => {
          columnsData[index] = {
            name: value,
            datatype: "string",
            description: "",
          };
        });
        setColumnsMetadata(columnsData);
      });
  }

  function setColumnState(index, payload) {
    columnsMetadata[index] = {
      ...columnsMetadata[index],
      ...payload,
    };
    setColumnsMetadata(columnsMetadata);
  }

  function DragAnDropOnClick() {
    inputRef.current.click();
  }

  return (
    <>
      <div className="content">
        <div className="wrapper">
          <div className="container">
            <div className="header">
              <img src={logoMzcr} alt="logo-data-mzcr" />
              <h1>Open Data Transformer</h1>
            </div>
          </div>
        </div>
        <div className="wrapper__metadata-form">
          <div className="container">
            <DragAndDrop
              file={file}
              setFile={setFile}
              onClick={DragAnDropOnClick}
            />

            <form onSubmit={handleSubmit}>
              <CsvPicker
                inputRef={inputRef}
                setEncoding={setEncoding}
                setDelimiter={setDelimiter}
                file={file}
                setFile={setFile}
              />
              {!!columnsMetadata.length && (
                <DatasetMetadataForm
                  datasetMetadata={datasetMetadata}
                  setDatasetMetadata={setDatasetMetadata}
                  tags={tags}
                  setTags={setTags}
                />
              )}
            </form>
          </div>
        </div>

        <div
          className={`wrapper${
            !!columnsMetadata.length ? "__column-form" : ""
          }`}
        >
          <div className="container">
            <form>
              {!!columnsMetadata.length && (
                <div>
                  <h2 className="form-column__heading">
                    Popis sloupcu datové sady
                  </h2>
                </div>
              )}
              <ul>
                {!!columnsMetadata.length &&
                  columnsMetadata.map((item, index) => {
                    return (
                      <li key={item.name}>
                        <ColumnForm
                          index={index}
                          columnName={item.name}
                          key={index}
                          handleChange={setColumnState}
                        />
                      </li>
                    );
                  })}
              </ul>
            </form>
          </div>
        </div>

        {!!columnsMetadata.length && (
          <div className="wrapper__download">
            <div className="container">
              <>
                <div className="form-buttons--text">
                  <p>
                    Před stažením si nezapomeňte validovat váš datový soubor
                  </p>
                </div>
                <div className="form-buttons">
                  <a
                    href="https://csvw.opendata.cz/"
                    target="_blank"
                    rel={"noreferrer"}
                    className="button--validate"
                  >
                    Validovat data
                    <img src={downloadIcon} alt={`${downloadIcon} ikonka`} />
                  </a>
                  <Button
                    type="download"
                    name={download}
                    onClick={handleDownloadCsv}
                  >
                    Stáhnout CSV
                  </Button>
                  <Button
                    type="download"
                    name={download}
                    onClick={handleDownloadMetadata}
                  >
                    Stáhnout metadata
                  </Button>
                </div>
              </>
            </div>
          </div>
        )}
      </div>

      <footer>
        <div>
          <div className="container">
            <div className="footer__logo">
              <a
                href="http://www.iba.muni.cz/"
                target="_blank"
                rel="noreferrer noopener"
                title="Institut biostatistiky a analýz Lékařské fakulty Masarykovy univerzity"
                aria-label="Institut biostatistiky a analýz Lékařské fakulty Masarykovy univerzity"
              >
                <img
                  src={logoMu}
                  alt="Institut biostatistiky a analýz Lékařské fakulty Masarykovy univerzity"
                />
              </a>
              <a
                href="https://www.uzis.cz/"
                target="_blank"
                rel="noreferrer noopener"
                title="Ústav zdravotnických informací a statistiky České republiky"
                aria-label="Ústav zdravotnických informací a statistiky České republiky"
              >
                <img
                  src={logoUzis}
                  alt="Ústav zdravotnických informací a statistiky České republiky"
                />
              </a>
              <div>
                společné pracoviště <br />{" "}
                <a
                  href="http://www.iba.muni.cz/"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="Institut biostatistiky a analýz Lékařské fakulty Masarykovy univerzity"
                  aria-label="Institut biostatistiky a analýz Lékařské fakulty Masarykovy univerzity"
                >
                  IBA LF MU
                </a>{" "}
                a{" "}
                <a
                  href="https://www.uzis.cz/"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="Ústav zdravotnických informací a statistiky ČR"
                  aria-label="Ústav zdravotnických informací a statistiky České republiky"
                >
                  ÚZIS ČR
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper__footer">
          <div className="container">
            <div>
              <button
                className="button--cookies"
                aria-label="Prohlédnout si nastavení cookies souborů"
              >
                COOKIES
              </button>
              <span className="footer--vertical" />
              <a
                href="https://www.uzis.cz/index.php?pg=kontakt"
                target="_blank"
              >
                HELPDESK
              </a>
            </div>
            <a
              href="https://webstudio.team/"
              target="_blank"
              rel="noreferrer noopener"
              title="webstudio.team"
              aria-label="Webová stránka webstudio.team (externí odkaz, nová záložka)"
            >
              <img src={logoWebStudio} alt="Web studio" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
