export default function FilePicker({ inputRef, handleFormChange }) {
  return (
    <div>
      <label htmlFor="file">Nahrajte súbor:</label>
      <div>
        <input name="file" type="file" ref={inputRef} />
      </div>
      <br />
      <label htmlFor="encoding">Kódování:</label>
      <div>
        <select onChange={handleFormChange} name="encoding" id="encoding">
          <option value="win1250">win1250</option>
        </select>
      </div>
      <br />
      <label htmlFor="delimiter">Oddělovač:</label>
      <div>
        <select onChange={handleFormChange} name="delimiter" id="delimiter">
          <option value=";">;</option>
        </select>
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
      <br />
    </div>
  );
}
