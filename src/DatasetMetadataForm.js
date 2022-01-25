import "@pathofdev/react-tag-input/build/index.css";

import ReactTagInput from "@pathofdev/react-tag-input";

export default function DatasetMetadataForm({
  datasetMetadata,
  setDatasetMetadata,
  tags,
  setTags,
}) {
  const handleChange = (event) => {
    setDatasetMetadata({
      ...datasetMetadata,

      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <label htmlFor="title">Titulek:</label>
      <div>
        <input name="title" type="text" onChange={handleChange} />
      </div>
      <br />
      <label htmlFor="description">Popis:</label>
      <div>
        <input name="description" type="text" onChange={handleChange} />
      </div>
      <br />
      <label htmlFor="filename">Název souboru:</label>
      <div>
        <input name="filename" type="text" onChange={handleChange} placeholder={"dataset.csv"} />
      </div>
      <br />
      <label htmlFor="source">Zdroj:</label>
      <div>
        <input name="source" type="text" onChange={handleChange} />
      </div>
      <br />
      <label htmlFor="tags">Tagy:</label>
      <div>
        <ReactTagInput
          name="tags"
          tags={tags}
          onChange={(newTags) => setTags(newTags)}
        />
      </div>
      <br />
    </div>
  );
}
