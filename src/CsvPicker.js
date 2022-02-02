import "./assets/css/form.css";

import csvFile from "./assets/images/csv-file.svg";
import close from "./assets/images/close.svg";

import { useEffect, useRef } from "react";

export default function CsvPicker({
  inputRef,
  setEncoding,
  setDelimiter,
  setFile,
  file,
}) {
  const encodingRef = useRef();
  const delimiterRef = useRef();

  useEffect(() => {
    setEncoding(encodingRef.current.value);
    setDelimiter(delimiterRef.current.value);
  }, []);

  return (
    <div className={`form-upload ${!!file ? "" : "visually-hidden"}`}>
      <div className="form-upload__input">
        {!!file && (
          <>
            <div>
              <img src={csvFile} alt="csv file"/>
              <span>{file.name}</span>
            </div>
            <img
              src={close}
              alt="zavřít"
              onClick={() => {
                setFile();
              }}
            />
          </>
        )}
      </div>
      <div className="form-upload__hidden-input visually-hidden">
        <label htmlFor="file">Nahrajte súbor:</label>
        <div>
          <input
            name="file"
            type="file"
            ref={inputRef}
            onChange={() => setFile(inputRef.current.files[0])}
          />
        </div>
      </div>
      <div className="form-upload__menu">
        <div className="form-upload__selects">
          <div>
            <label htmlFor="encoding">Kódování:</label>
            <div>
              <select
                ref={encodingRef}
                onChange={(e) => setEncoding(e.target.value)}
                name="encoding"
                id="encoding"
              >
                <option value="win1250">win1250</option>
                <option value="utf8">utf8</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="delimiter">Oddělovač:</label>
            <div>
              <select
                ref={delimiterRef}
                onChange={(e) => setDelimiter(e.target.value)}
                name="delimiter"
                id="delimiter"
              >
                <option value=";">;</option>
                <option value=",">,</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <input type="submit" value="Načíst" className="button--submit" />
        </div>
      </div>
    </div>
  );
}
