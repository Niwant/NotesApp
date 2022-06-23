import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { createNote } from "../features/notes/noteSlice";
import { updateUser } from "../features/auth/authSlice";
import _ from "lodash";
import "../styles/NoteModal.css";

function NoteModal(prevnote) {
  const modal = useRef();
  const chip = useRef();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [noteData, setnoteData] = useState({
    title: "",
    body: "",
    flag: false,
    tags: [],
  });

  const { title, body, flag, tags } = noteData;

  const onSubmit = (e) => {
    e.preventDefault();
    var instance = M.Chips.getInstance(chip.current);
    var chipdata = instance.chipsData.map((chipdata) => chipdata.tag);
    const noteData = {
      title,
      body,
      flag,
      tags: chipdata,
    };

    const usertags = {
      tags: _.union(chipdata, user.tags),
    };
    dispatch(createNote(noteData));
    dispatch(updateUser(usertags));

    setnoteData(() => ({
      title: "",
      body: "",
      flag: false,
      tags: [],
    }));
  };

  const onChange = (e) => {
    setnoteData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.7,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(modal.current, options);
    M.Chips.init(chip.current, {
      placeholder: "Add tag",
    });
    //var instance = M.Modal.getInstance(modal.current);
  }, []);
  return (
    <>
      <div className="fixed-action-btn modal-trigger" data-target="#modal1">
        <a
          className="btn-floating btn-large red modal-trigger pulse notebutton"
          data-target="modal1"
          href="javascript"
        >
          <i className="large material-icons">mode_edit</i>
        </a>
      </div>
      <div ref={modal} id="modal1" className="modal modalCont">
        <form onSubmit={onSubmit} className="formContainer">
          <div className="tagAlign">
            <a
              className="btn blue darken-3 tagBtn prefix"
              href="javascript:void(0);"
            >
              Tags
            </a>
            <div ref={chip} class="chips chipHolder ">
              <input className="custom-class chipField" />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <a className="btn blue darken-3  btnStyle prefix">Title</a>
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                className="validate inpField "
                onChange={onChange}
              />
              <label htmlFor="title" className="label">
                Enter your Note Title
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <a className="btn blue darken-3 btnStyle prefix">Body</a>
              <textarea
                id="body"
                type="text"
                name="body"
                value={body}
                className="validate materialize-textarea textBody"
                onChange={onChange}
              ></textarea>
              <label htmlFor="body" className="label">
                Note Content
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
              className="btn indigo darken-3 modal-close"
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

export default NoteModal;
