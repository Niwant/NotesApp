import React, { useEffect, useRef } from "react";
import M from "materialize-css";
import { useDispatch } from "react-redux";
import { getNotes } from "../features/notes/noteSlice";

function TagSearch({ tags, selectTags, setSelectTags }) {
  const form = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    M.FormSelect.init(form.current);
  }, []);

  const onClick = () => {
    const searchTags = M.FormSelect.getInstance(
      form.current
    ).getSelectedValues();

    dispatch(getNotes({ tags: searchTags }));
    console.log(searchTags);
    setSelectTags(searchTags);
  };
  console.log(selectTags);

  const onReset = () => {
    dispatch(getNotes({}));
  };

  return (
    <div>
      <div class="input-field col s12">
        <select ref={form} multiple>
          {tags.map((tag) => (
            <option value={tag} selected={selectTags.includes(tag)}>
              {tag}
            </option>
          ))}
        </select>
        <label>Filter by Tags : {selectTags}</label>
      </div>
      <button
        className="btn col s12 blue darken-1"
        onClick={onClick}
        style={{ marginTop: "5px" }}
      >
        Search
      </button>
      <button
        className="btn col s12 red"
        onClick={onReset}
        style={{ marginTop: "10px" }}
      >
        Reset
      </button>
      <div>showing Results for :</div>
    </div>
  );
}

export default TagSearch;
