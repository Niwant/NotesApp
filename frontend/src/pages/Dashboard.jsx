import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteModal from "../components/NoteModal";
import { getNotes, reset } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import NoteCard from "../components/NoteCard";
import Pagination from "../components/Pagination";
import TagSearch from "../components/TagSearch";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectTags, setSelectTags] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const {
    notes,
    isLoading,
    isSuccessNote,
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
    }

    dispatch(getNotes({}));

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    // navigate,
    // isSuccessNote,
    // isError,
    // message.dispatch,
    // dispatch,
    // message,
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
            <TagSearch
              tags={user.tags}
              selectTags={selectTags}
              setSelectTags={setSelectTags}
            />
          </div>
          <div className="col s9" style={{ marginTop: "10px" }}>
            {isLoading ? (
              <Spinner />
            ) : notes.length > 0 ? (
              <div
                className="row"
                style={{
                  marginLeft: "3vw",
                  marginTop: "2vh",
                  marginRight: "5px",
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
            <Pagination numberofPages={numberofPages} />
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
