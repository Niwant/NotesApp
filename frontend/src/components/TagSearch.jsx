import React, { useEffect, useRef } from "react";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../features/notes/noteSlice";
import Spinner from "./Spinner";

function TagSearch({ tags, selectTags, setSelectTags }) {
  const form = useRef();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

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
    setSelectTags([]);
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
        <label>Filter by Tags : {selectTags.join(",")}</label>
      </div>
      <button
        className="btn col s12 blue darken-1"
        onClick={onClick}
        style={{ marginTop: "5px", height: "32px" }}
      >
        Search
      </button>
      <button
        className="btn col s12 red"
        onClick={onReset}
        style={{ marginTop: "10px", height: "32px" }}
      >
        Reset
      </button>
    </div>
  );
}

export default TagSearch;
