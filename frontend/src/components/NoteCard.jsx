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

function NoteCard({ note }) {
  const modal = useRef();
  const chip = useRef();
  const deleteref = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.note);

  useEffect(() => {
    M.Modal.init(modal.current);
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
    console.log("i Was triggered");
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
      <div class="col s3">
        <div
          class="card small z-depth-2 grey lighten-5"
          style={{
            border: "2px solid #cbcff7 ",
            borderRadius: "20px 0px 5px 5px",
            height: "33vh",
          }}
        >
          <div class="card-content" style={{ marginTop: "0px" }}>
            <span class="card-title " style={{ marginTop: "0px" }}>
              <h4>{title}</h4>
            </span>
            <p className="truncate indigo-text darken-3">{body}</p>
            <h6>
              {tags.map((tag) => (
                <div className="chip">{tag}</div>
              ))}
            </h6>
          </div>
          <div class="card-action">
            <div className="row">
              <button
                className="large btn modal-trigger white-text col s2 blue darken-1 z-depth-1"
                data-target={title}
              >
                <i className="material-icons ">open_in_full</i>
              </button>
              <button
                className="btn col s2 offset-s8 modal-trigger red z-dept-1"
                data-target={note._id}
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={deleteref} id={note._id} class="modal">
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
      <div ref={modal} id={title} class="modal">
        <div ref={chip} className="chips chips-placeholder chips-initial"></div>
        <form onSubmit={onUpdate}>
          <div className="modal-content">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">title</i>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={title}
                  className="validate"
                  onChange={onChange}
                  style={{ border: "2px solid grey", borderRadius: "10px" }}
                />
                <label className="active" htmlFor="title">
                  Enter your Note Title
                </label>
              </div>
            </div>

            <div className="row" style={{ margin: "0" }}>
              <div className="input-field col s12" style={{ margin: "0" }}>
                <i className="material-icons prefix">text_snippet</i>
                <textarea
                  id="body"
                  type="text"
                  name="body"
                  value={body}
                  className="validate materialize-textarea"
                  onChange={onChange}
                  style={{
                    border: "2px solid grey",
                    height: " 30vh",
                    borderRadius: "10px",
                  }}
                ></textarea>
                <label className="active" htmlFor="body">
                  Note Content..
                </label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a className="modal-close btn-flat">Cancel</a>
            <button class="btn indigo darken-3 modal-close" type="submit">
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
