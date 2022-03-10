import "@pathofdev/react-tag-input/build/index.css";
import "./assets/scss/_metadata-form.scss";

import ReactTagInput from "@pathofdev/react-tag-input";
import { useCallback } from "react";

export default function DatasetMetadataForm({
  datasetMetadata,
  setDatasetMetadata,
  tags,
  setTags,
  descriptionLengthLimit = 500,
}) {
  const handleChange = (event) => {
    setDatasetMetadata({
      ...datasetMetadata,

      [event.target.name]: event.target.value,
    });
  };

  const setFormattedContent = useCallback(
    (event) => {
      setDatasetMetadata({
        ...datasetMetadata,
        [event.target.name]: event.target.value.slice(
          0,
          descriptionLengthLimit
        ),
      });
    },
    [descriptionLengthLimit, datasetMetadata]
  );

  return (
    <div className="metadata-from">
      <div className="metadata-from__heading">
        <h2>Popis datové sady</h2>
      </div>
      <div className="metadata-from__title">
        <label htmlFor="title">Titulek:</label>
        <div>
          <input
            name="title"
            type="text"
            onChange={handleChange}
            placeholder="Například “COVID, Červenec 2021”"
          />
        </div>
      </div>
      <div className="metadata-from__filename">
        <label htmlFor="filename">Název souboru:</label>
        <div>
          <input
            name="filename"
            type="text"
            onChange={handleChange}
            placeholder={'Například "covid-cervenec-21.csv"'}
          />
        </div>
      </div>
      <div className="metadata-from__source">
        <label htmlFor="source">Zdroj:</label>
        <div>
          <input
            name="source"
            type="text"
            onChange={handleChange}
            placeholder="Například “ÚZIS ČR”"
          />
        </div>
      </div>
      <div className="metadata-from__tags">
        <label htmlFor="tags">Tagy:</label>
        <div>
          <ReactTagInput
            name="tags"
            tags={tags}
            placeholder="Zadejte a stiskněte ENTER"
            onChange={(newTags) => setTags(newTags)}
          />
        </div>
      </div>
      <div className="metadata-from__description">
        <div className="metadata-from__description--label">
          <label htmlFor="description">Popis:</label>
          <div>
            {datasetMetadata.description.length}/{descriptionLengthLimit}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            value={datasetMetadata.description}
            onChange={setFormattedContent}
            placeholder="Maximálně 500 znaků"
            className={
              descriptionLengthLimit === datasetMetadata.description.length
                ? "has-border"
                : ""
            }
          />
        </div>
        {descriptionLengthLimit === datasetMetadata.description.length ? (
          <div className="warning">Dosáhli jste limitu počtu znaků!</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
