import "@pathofdev/react-tag-input/build/index.css";
import "./assets/css/tagInput.css";
import "./assets/css/metadataForm.css";

import ReactTagInput from "@pathofdev/react-tag-input";
import { useCallback } from "react";

export default function DatasetMetadataForm({
  datasetMetadata,
  setDatasetMetadata,
  tags,
  setTags,
  limit,
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
        [event.target.name]: event.target.value.slice(0, limit),
      });
    },
      [limit, setDatasetMetadata]
  );

  return (
    <div className="metadata-from">
        <div className="metadata-from__heading">
            <h2>Popis datové sady</h2>
        </div>
      <div className="metadata-from__title">
        <label htmlFor="title">Titulek:</label>
        <div>
          <input name="title" type="text" onChange={handleChange} />
        </div>
      </div>
      <div className="metadata-from__filename">
        <label htmlFor="filename">Název souboru:</label>
        <div>
          <input
            name="filename"
            type="text"
            onChange={handleChange}
            placeholder={"dataset.csv"}
          />
        </div>
      </div>
      <div className="metadata-from__source">
        <label htmlFor="source">Zdroj:</label>
        <div>
          <input name="source" type="text" onChange={handleChange} />
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
            {datasetMetadata.description.length}/{limit}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            value={datasetMetadata.description}
            onChange={setFormattedContent}
            style={limit === datasetMetadata.description.length ? {border: "1px solid #D31145"} : {}}
          />
        </div>
        {limit === datasetMetadata.description.length ? (
          <div className="warning">Dosáhli jste limitu počtu znaků!</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
