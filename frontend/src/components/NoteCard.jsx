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
      <div class="row ">
        <div class="col s12 m6 ">
          <div class="card  white lighten-5 z-depth-2">
            <div class="card-content indigo-text ">
              <span class="card-title">
                <h4>{title}</h4>
              </span>
              <p className="truncate">{body}</p>
              <h6>
                {tags.map((tag) => (
                  <div className="chip">{tag}</div>
                ))}
              </h6>
            </div>
            <div class="card-action">
              <div className="row">
                <button
                  className="large btn modal-trigger white-text col s2 indigo darken-3"
                  data-target={title}
                >
                  <i className="material-icons ">open_in_full</i>
                </button>
                <button
                  className="btn col s2 offset-s8 modal-trigger red"
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
            <a href="javascript" class="modal-close btn-flat">
              No
            </a>
            <a
              href="javascript"
              class="modal-close  btn-flat"
              onClick={onDelete}
            >
              Yes
            </a>
          </div>
        </div>
        <div ref={modal} id={title} class="modal">
          <form onSubmit={onUpdate}>
            <div className="modal-content">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <i className="material-icons prefix">title</i>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    className="validate"
                    onChange={onChange}
                  />
                  <label className="active" htmlFor="title">
                    Enter your Note Title
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">text_snippet</i>
                  <textarea
                    id="body"
                    type="text"
                    name="body"
                    value={body}
                    className="validate materialize-textarea"
                    onChange={onChange}
                  ></textarea>
                  <label className="active" htmlFor="body">
                    body
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-close btn-flat">Cancel</button>
              <button class="btn indigo darken-3 modal-close" type="submit">
                Save
                <i className="material-icons right">save</i>
              </button>
            </div>
          </form>
          <div
            ref={chip}
            className="chips chips-placeholder chips-initial col s8 offset-s1"
          ></div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
