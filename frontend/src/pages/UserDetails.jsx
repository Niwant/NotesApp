import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import { passwordUpdate } from "../features/auth/authSlice";

function UserDetails() {
  const { user } = useSelector((state) => state.auth);
  const [confrimPassword, setConfirmPassword] = useState({
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const { password, password2 } = confrimPassword;

  const onChange = (e) => {
    setConfirmPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2 || password.length <= 1) {
      M.toast({ html: "Wrong Password" });
    } else {
      dispatch(passwordUpdate({ password }));
      M.toast({ html: "Password Changed Successfully" });
    }
  };

  return (
    <>
      <div
        className="userdetails"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: "90vw",
          height: "75vh",
        }}
      >
        <h2>Hello {user.user}</h2>
        <h4>{user.email}</h4>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
            width: "25vw",
          }}
          onSubmit={onSubmit}
        >
          <div className="input-field">
            <i className="material-icons prefix">password</i>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              className="validate"
              onChange={onChange}
              style={{
                border: "3px solid #283593",
                paddingLeft: "10px",
                height: "32px",
              }}
            />
            <label
              style={{
                fontWeight: "bold",
                marginLeft: "4vw",
                paddingBottom: "5px",
              }}
              htmlFor="password"
            >
              Enter New Password
            </label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">password</i>
            <input
              id="password2"
              type="text"
              name="password2"
              value={password2}
              className="validate"
              onChange={onChange}
              style={{
                border: "3px solid #283593",
                paddingLeft: "10px",
                height: "32px",
              }}
            />
            <label
              style={{
                fontWeight: "bold",
                marginLeft: "4vw",
                paddingBottom: "5px",
              }}
              htmlFor="password2"
            >
              Confirm New Password
            </label>
          </div>
          <button
            type="submit"
            className="btn"
            style={{ width: "23vw", marginLeft: "3vw" }}
          >
            <i className="material-icons">key</i> Confirm Password
          </button>
        </form>
      </div>
    </>
  );
}

export default UserDetails;
