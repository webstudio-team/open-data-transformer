export default function ColumnForm({ index, columnName, handleChange }) {
  const handleInput = (event) => {
    handleChange(index, {
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <label htmlFor="name">Název:</label>
      <div>
        <input
          name="name"
          type="text"
          defaultValue={columnName}
          onChange={handleInput}
        />
      </div>
      <br />
      <label htmlFor="datatype">Datový typ:</label>
      <div>
        <select name="datatype" id="datatype" onChange={handleInput}>
          <option value="string">string</option>
          <option value="integer">integer</option>
        </select>
      </div>
      <br />
      <label htmlFor="description">Popis:</label>
      <div>
        <input name="description" type="text" onChange={handleInput} />
      </div>
      <br />
    </div>
  );
}
