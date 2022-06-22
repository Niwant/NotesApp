import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { createNote } from "../features/notes/noteSlice";
import { updateUser } from "../features/auth/authSlice";
import _ from "lodash";

function NoteModal(prevnote) {
  const modal = useRef();
  const chip = useRef("chip");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isError, isSuccess, message } = useSelector((state) => state.note);
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

    if (isError) {
      M.toast({ html: `${message}` });
    }
    if (isSuccess) {
      M.toast({ html: "Note Saved!" });
    }
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
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(modal.current, options);
    M.Chips.init(chip.current, {
      placeholder: "Add tag",
      secondaryPlaceholder: "+tag",
    });
    //var instance = M.Modal.getInstance(modal.current);
  }, []);
  return (
    <>
      <div className="fixed-action-btn modal-trigger" data-target="#modal1">
        <a
          className="btn-floating btn-large red modal-trigger pulse"
          data-target="modal1"
          href="javascript"
        >
          <i className="large material-icons">mode_edit</i>
        </a>
      </div>

      <div ref={modal} id="modal1" className="modal z-depth-1">
        <div
          ref={chip}
          className="chips chips-placeholder"
          style={{ height: "10px" }}
        ></div>
        <form onSubmit={onSubmit}>
          <div className="modal-content">
            <div className="row">
              <div className="input-field col s12 ">
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
                <label htmlFor="title">Enter your Note Title</label>
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
                <label htmlFor="body">Note Content</label>
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ margin: "0" }}>
            <a className="modal-close btn-flat">Cancel</a>
            <button className="btn indigo darken-3 modal-close" type="submit">
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
