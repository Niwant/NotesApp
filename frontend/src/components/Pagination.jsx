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
    dispatch(getNotes(e.target.value));
  };
  const onFirst = (e) => {
    dispatch(getNotes());
  };
  const onLast = (e) => {
    dispatch(getNotes(numberofPages));
  };

  return (
    <>
      <button className="btn-flat" value={1} onClick={onFirst}>
        <i class="material-icons">chevron_left</i>
      </button>

      <ul class="pagination ">
        {page.map((pageno) => (
          <li>
            <button className="btn-flat" value={pageno} onClick={onClick}>
              {pageno}
            </button>
          </li>
        ))}
      </ul>

      <button className="btn-flat" value={numberofPages} onClick={onLast}>
        <i class="material-icons">chevron_right</i>
      </button>
    </>
  );
}

export default Pagination;
