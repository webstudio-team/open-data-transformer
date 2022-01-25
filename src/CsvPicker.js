import { useEffect, useRef } from "react";

export default function CsvPicker({ inputRef, setEncoding, setDelimiter }) {
  const encodingRef = useRef();
  const delimiterRef = useRef();

  useEffect(() => {
    setEncoding(encodingRef.current.value);
    setDelimiter(delimiterRef.current.value);
  }, []);

  return (
    <div>
      <label htmlFor="file">Nahrajte súbor:</label>
      <div>
        <input name="file" type="file" ref={inputRef} />
      </div>
      <br />
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
      <br />
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
      <div>
        <input type="submit" value="Submit" />
      </div>
      <br />
    </div>
  );
}
