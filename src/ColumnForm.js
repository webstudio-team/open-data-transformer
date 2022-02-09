import "../src/assets/scss/_column-form.scss";

import React, { useState } from "react";

export default function ColumnForm({
  index,
  columnName,
  handleChange,
  descriptionLengthLimit = 200,
}) {
  const [descriptionLength, setDescriptionLength] = useState(0);
  const handleInput = (event) => {
    handleChange(index, {
      [event.target.name]: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    const input = event.target;
    if (input.value.length > descriptionLengthLimit) {
      input.value = input.value.slice(0, descriptionLengthLimit);
      input.classList.add("has-border");
      input.nextSibling.classList.remove("hidden");
      return;
    }
    input.classList.remove("has-border");
    input.nextSibling.classList.add("hidden");
    handleChange(index, {
      [input.name]: input.value,
    });
    setDescriptionLength(input.value.length);
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
      <div className="form-column-description__label">
        <label htmlFor="description">Popis:</label>
        <span className="form-column-description__indicator">
          {descriptionLength}/{descriptionLengthLimit}
        </span>
      </div>
      <input
        className="form-column-description__input"
        name="description"
        type="text"
        onChange={handleDescriptionChange}
        placeholder={`Maximálně ${descriptionLengthLimit} znaků`}
      />
      <div className="warning hidden">Dosáhli jste limitu počtu znaků!</div>
    </div>
  );
}
