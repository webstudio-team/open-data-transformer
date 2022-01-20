export default function FormComponent({ index, headerData, handleChange }) {
  const handleInput = (event) => {
    handleChange(index, {
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <input
        name="name"
        type="text"
        defaultValue={headerData}
        onChange={handleInput}
      />
      <select name="datatype" id="datatype" onChange={handleInput}>
        <option value="string">string</option>
        <option value="integer">integer</option>
      </select>
      <input name="description" type="text" onChange={handleInput} />
    </div>
  );
}
