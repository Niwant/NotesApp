import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { getNotes } from "../features/notes/noteSlice";
import _ from "lodash";

function Header() {
  const [searchTerm, setsearchTerm] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const text = useRef();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const onChange = (e) => {
    setsearchTerm(e.target.value);
    dispatch(getNotes({ searchTerm: e.target.value }));
  };

  const onClear = (e) => {
    if (text.current.value.length) {
      text.current.value = "";
      dispatch(getNotes({}));
    }
  };

  return (
    <>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper indigo darken-3 row">
            <div className="col s3">
              <div className="brand-logo ">
                {user ? (
                  <Link
                    to="/home"
                    style={{ fontFamily: "'Cabin Sketch', cursive" }}
                  >
                    NotesApp
                  </Link>
                ) : (
                  <Link
                    to="/"
                    style={{ fontFamily: "'Cabin Sketch', cursive" }}
                  >
                    NotesApp
                  </Link>
                )}
              </div>
            </div>

            <form
              className="col s6"
              style={{
                color: "blue",
              }}
            >
              {user ? (
                <div
                  className="valign-wrapper input-field"
                  style={{
                    paddingBottom: "5px",
                    paddingTop: "10px",
                  }}
                >
                  <input
                    ref={text}
                    id="search"
                    type="search"
                    required
                    placeholder="Search"
                    style={{ borderRadius: "15px" }}
                    onChange={_.debounce(onChange, 300)}
                  />
                  <label className="valign-wrapper label-icon" htmlFor="search">
                    <i className="valign-wrapper material-icons">search</i>
                  </label>
                  <i className="material-icons" onClick={onClear}>
                    close
                  </i>
                </div>
              ) : (
                <div></div>
              )}
            </form>

            <ul id="nav-mobile" className="right hide-on-med-and-down col s2">
              {user ? (
                <>
                  <li>
                    <button className="btn-flat white-text" onClick={onLogout}>
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link to="/userdetails" className="valign-wrapper">
                      <i className="material-icons">person</i>
                      {user.user}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="valign-wrapper">
                      <i className="material-icons">login</i>Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="valign-wrapper">
                      <i className="material-icons">app_registration</i>Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
