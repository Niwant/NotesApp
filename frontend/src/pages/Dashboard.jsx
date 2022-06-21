import React, { useEffect } from "react";
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

  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isSuccessNote, isError, message, numberofPages } =
    useSelector((state) => state.note);

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
  }, [user, navigate, isSuccessNote, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="row">
        <div
          className="col s2"
          style={{
            margin: "0",
            position: "relative",
            top: "35px",
            borderRight: "1px solid #dddddd",
            height: "78vh",
          }}
        >
          <TagSearch tags={user.tags} />
        </div>
        <div className="col s9">
          <h1>Welcome {user && user.user}</h1>

          {notes.length > 0 ? (
            <div className="row">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <div className="valign-wrapper">
              <h2 className="grey-text ligthen-2">Make your first Note</h2>
            </div>
          )}
          <NoteModal clasName="fixed" />
        </div>
      </div>
      <Pagination numberofPages={numberofPages} />
    </>
  );
}

export default Dashboard;
