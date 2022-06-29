import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../features/notes/noteSlice";
import "../styles/Pagination.css";

function Pagination({ numberofPages, selectTags }) {
  const page = [];

  for (let i = 1; i <= numberofPages; i += 1) {
    page.push(i);
  }

  const dispatch = useDispatch();

  const onClick = (e) => {
    selectTags.length
      ? dispatch(getNotes({ page: e.target.value, tags: selectTags }))
      : dispatch(getNotes({ page: e.target.value }));
  };
  const onFirst = (e) => {
    dispatch(getNotes({}));
  };
  const onLast = (e) => {
    dispatch(getNotes({ page: numberofPages }));
  };

  return (
    <>
      <div className="alignments">
        <button
          className="btn-floating blue darken-1 ends"
          value={1}
          onClick={onFirst}
          style={{ margin: "5px", marginRight: "10px" }}
        >
          <i class="material-icons">chevron_left</i>
        </button>

        {/* <ul
          class="pagination alignments"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
        {page.map((pageno) => (
          // <li>
          <button
            className="btn black-text buttons"
            value={pageno}
            onClick={onClick}
          >
            {pageno}
          </button>
          // </li>
        ))}
        {/* </ul> */}

        <button
          className="btn-floating blue darken-1 ends"
          value={numberofPages}
          onClick={onLast}
          style={{ margin: "5px", marginLeft: "10px" }}
        >
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
    </>
  );
}

export default Pagination;
