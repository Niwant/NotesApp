import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../features/notes/noteSlice";

function Pagination({ numberofPages }) {
  const page = [];

  for (let i = 1; i <= numberofPages; i += 1) {
    page.push(i);
  }

  const dispatch = useDispatch();

  const onClick = (e) => {
    dispatch(getNotes({ page: e.target.value }));
  };
  const onFirst = (e) => {
    dispatch(getNotes());
  };
  const onLast = (e) => {
    dispatch(getNotes({ page: numberofPages }));
  };

  return (
    <>
      <button
        className="btn-floating waves-effect blue darken-1"
        value={1}
        onClick={onFirst}
        style={{ margin: "5px", marginRight: "10px" }}
      >
        <i class="material-icons">chevron_left</i>
      </button>

      <ul
        class="pagination "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {page.map((pageno) => (
          <li>
            <button
              className="btn waves-effect white black-text"
              value={pageno}
              onClick={onClick}
            >
              {pageno}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="btn-floating blue darken-1"
        value={numberofPages}
        onClick={onLast}
        style={{ margin: "5px", marginLeft: "10px" }}
      >
        <i class="material-icons">chevron_right</i>
      </button>
    </>
  );
}

export default Pagination;
