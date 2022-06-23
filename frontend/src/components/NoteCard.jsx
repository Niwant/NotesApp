import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {
  deleteNote,
  getNotes,
  updateNote,
  reset,
} from "../features/notes/noteSlice";
import { useNavigate } from "react-router-dom";
import "../styles/NoteCard.css";

function NoteCard({ note }) {
  const modal = useRef();
  const chip = useRef();
  const deleteref = useRef();
  const favref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.note);

  useEffect(() => {
    M.Modal.init(modal.current, { opacity: 0.7 });
    M.Modal.init(deleteref.current);
    M.Chips.init(chip.current, {
      data: note.tags.map((tagi) => ({ tag: tagi })),
    });
  }, []);

  const [cardData, setcardData] = useState({
    title: note.title,
    body: note.body,
    flag: note.flag,
    tags: note.tags,
  });
  const { title, body, tags, flag } = cardData;

  const onChange = (e) => {
    setcardData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    var instance = M.Chips.getInstance(chip.current);
    var chipdata = instance.chipsData.map((chipdata) => chipdata.tag);
    console.log(chipdata);
    const noteData = [
      note._id,
      {
        title,
        body,
        flag,
        tags: chipdata,
      },
    ];
    //console.log("i Was triggered");
    dispatch(updateNote(noteData));

    setcardData(() => ({
      title,
      body,
      flag,
      tags: chipdata,
    }));
  };
  const onDelete = () => {
    dispatch(deleteNote(note._id));
  };

  return (
    <>
      <div class="z-depth-2 grey lighten-5 cardDesign col s3">
        <div class="contentStyle">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "16vw",
            }}
          >
            <h5 style={{ fontWeight: "bold" }}>{title}</h5>
            <button className="btn-flat" id="favtoggle">
              <i className="material-icons">favorite_border</i>
            </button>
          </div>
          <p className=" truncate black-text darken-3">{body}</p>
          <h6>
            {tags.map((tag) => (
              <div className="chip tags">{tag}</div>
            ))}
          </h6>
        </div>
        <div class="alignments actions">
          {/* <div className=" row "> */}
          <div></div>
          <div>
            <button
              className="btn modal-trigger white-text  blue darken-1 z-depth-1 "
              data-target={title}
              style={{ transform: "scale(0.7)" }}
            >
              <i className="material-icons ">open_in_full</i>
            </button>
            <button
              className="btn modal-trigger red z-dept-1"
              data-target={note._id}
              style={{ transform: "scale(0.7)" }}
            >
              <i className="material-icons">delete</i>
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div
        ref={deleteref}
        id={note._id}
        class="modal"
        //style={{ height: "40px !important" }}
      >
        <div class="modal-content">
          <h4>{title}</h4>
          <p>Do you really want to delete this Note!!</p>
        </div>
        <div class="modal-footer">
          <a class="modal-close btn-flat">No</a>
          <button class="modal-close  btn-flat" onClick={onDelete}>
            Yes
          </button>
        </div>
      </div>
      <div ref={modal} id={title} class="modal modalCont">
        {/* <div ref={chip} className="chips chips-placeholder chips-initial"></div> */}
        <form onSubmit={onUpdate} className="formCont">
          <div className="tagAlign">
            <a className="btn blue darken-3 tagBtn prefix">Tags</a>
            <div ref={chip} class="chips chips-initial chipHolder ">
              <input className="custom-class chipField" />
            </div>
          </div>
          <div className="row">
            <div className="input-field" style={{ marginLeft: "4vw" }}>
              <a className="btn blue darken-3  btnStyle prefix">Title</a>
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                className="validate inpField"
                onChange={onChange}
              />
              <label className="active label" htmlFor="title">
                Enter your Note Title
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field" style={{ marginLeft: "4vw" }}>
              <a className="btn blue darken-3 btnStyle prefix">Body</a>
              <textarea
                id="body"
                type="text"
                name="body"
                value={body}
                className="validate materialize-textarea textBody"
                onChange={onChange}
                // style={{
                //   border: "2px solid grey",
                //   height: " 30vh",
                //   borderRadius: "10px",
                // }}
              ></textarea>
              <label className="active label" htmlFor="body">
                Note Content..
              </label>
            </div>
          </div>

          <div className="modal-footer footerAlign">
            <a
              className="modal-close btn white indigo-text darken-3"
              style={{ transform: "scale(0.9)", border: "1px solid #283593" }}
            >
              Cancel
            </a>
            <button
              class="btn indigo darken-3 modal-close"
              type="submit"
              style={{ transform: "scale(0.9)" }}
            >
              Save
              <i className="material-icons right">save</i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NoteCard;
