import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import NoteModal from "../components/NoteModal";
import { getNotes, reset } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import NoteCard from "../components/NoteCard";
import Pagination from "../components/Pagination";
import TagSearch from "../components/TagSearch";
import M from "materialize-css";

function Dashboard() {
  const dispatch = useDispatch();
  const [selectTags, setSelectTags] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const {
    notes,
    isLoading,
    isSuccessNote,
    isSuccess,
    isError,
    message,
    numberofPages,
    currentPage,
  } = useSelector((state) => state.note);

  // useEffect(() => {
  //   dispatch(getNotes());
  // }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
      M.toast({ html: `${message}` });
    }
    if (isSuccess) {
      M.toast({ html: "Note Saved" });
    }

    if (isSuccessNote) {
      dispatch(getNotes({}));
    }
    dispatch(getNotes({}));

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    // navigate,
    //isSuccessNote,
    //isError,
    // message.dispatch,
    //message,
    //isSuccess,
  ]);

  return (
    <>
      <div style={{}}>
        <div className="row">
          <div
            className="col s2"
            style={{
              margin: "0",
              position: "relative",
              top: "35px",
              borderRight: "2px solid #dddddd",
              height: "78vh",
            }}
          >
            <h3>Welcome {user && user.user}</h3>
            <div>
              <h6>
                Page : {currentPage} / {numberofPages}
              </h6>
            </div>
            {isLoading ? (
              <></>
            ) : (
              <TagSearch
                tags={user.tags}
                selectTags={selectTags}
                setSelectTags={setSelectTags}
              />
            )}
          </div>
          <div className="col s10" style={{ marginTop: "25px" }}>
            {isLoading ? (
              <Spinner />
            ) : notes.length > 0 ? (
              <div
                className=""
                style={{
                  marginTop: "5vh",
                  marginLeft: "3vw !important",
                }}
              >
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            ) : (
              <div className="valign-wrapper">
                <h2 className="grey-text ligthen-2">No Notes....</h2>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {numberofPages > 1 ? (
            <Pagination numberofPages={numberofPages} selectTags={selectTags} />
          ) : (
            <div></div>
          )}
        </div>
        <NoteModal clasName="fixed" />
      </div>
    </>
  );
}

export default Dashboard;
