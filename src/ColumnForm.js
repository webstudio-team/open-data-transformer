import React from "react";

export default function ColumnForm({
  index,
  columnName,
  handleChange,
  descriptionLengthLimit = 200,
}) {
  const handleInput = (event) => {
    handleChange(index, {
      [event.target.name]: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    if (event.target.value.length > descriptionLengthLimit) {
      event.target.value = event.target.value.slice(0, descriptionLengthLimit);
      event.target.classList.add("has-border");
      event.target.nextSibling.classList.remove("hidden");
      return;
    }
    event.target.classList.remove("has-border");
    event.target.nextSibling.classList.add("hidden");
    handleChange(index, {
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="form-column">
      <div className="form-column__wrapper">
        <div className="form-column__name">
          <label htmlFor="name">Název:</label>
          <div>
            <input
              name="name"
              type="text"
              defaultValue={columnName}
              onChange={handleInput}
            />
          </div>
        </div>
        <br />

        <div className="form-column__select">
          <label htmlFor="datatype">Datový typ:</label>
          <div>
            <select name="datatype" id="datatype" onChange={handleInput}>
              <option value="string">string</option>
              <option value="integer">integer</option>
              <option value="float">float</option>
              <option value="boolean">boolean</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-column__description">
        <label htmlFor="description">Popis:</label>
        <div>
          <input
            name="description"
            type="text"
            onChange={handleDescriptionChange}
            placeholder="Maximálně 200 znaků"
          />
          <div className="warning hidden">Dosáhli jste limitu počtu znaků!</div>
        </div>
      </div>
    </div>
  );
}
