import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import { passwordUpdate } from "../features/auth/authSlice";
import "../styles/Form.css";

function UserDetails() {
  const { user, isError, message, isPassUpdate } = useSelector(
    (state) => state.auth
  );
  const [confrimPassword, setConfirmPassword] = useState({
    password: "",
    password2: "",
    currpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const showForm = useRef();
  const showButton = useRef();
  const dispatch = useDispatch();
  const { password, password2, currpassword } = confrimPassword;

  useEffect(() => {
    if (isError) {
      M.toast({ html: `${message}` });
    }
    if (isPassUpdate) {
      M.toast({ html: "Password Updated Successfully" });
    }
  }, [isError, isPassUpdate]);

  const onChange = (e) => {
    setConfirmPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2 || password.length <= 1) {
      M.toast({ html: "Wrong Password" });
    } else {
      dispatch(passwordUpdate({ currpassword, password }));
      setConfirmPassword({
        currpassword: "",
        password: "",
        password2: "",
      });
    }
  };
  const onClickForm = () => {
    showButton.current.classList.remove("btn-large");
    console.log(showForm.current.classList.add("show_form"));
    console.log(showForm.current.classList);
  };

  return (
    <>
      <div
        className="userdetails"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100vw",
          height: "75vh",
        }}
      >
        <h2>Hello {user.user}</h2>
        <div style={{ display: "flex" }}>
          <h4>E-mail:</h4>
          <h4 className="indigo-text darken-3">{user.email}</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            width: "35vw",
            height: "10vh important",
            //borderTop: "2px solid grey",
            marginTop: "10vh",
          }}
        >
          {isPassUpdate ? (
            <h6 className="center" style={{ color: "red" }}>
              Password Updated...To again change password Refresh or Relogin
            </h6>
          ) : (
            <h5 className="center">
              <a
                ref={showButton}
                className="btn-large"
                style={{ cursor: "pointer" }}
                onClick={onClickForm}
              >
                Change Password
              </a>
            </h5>
          )}

          <form
            ref={showForm}
            className="hide_form"
            // style={{
            //   //display: "none",
            //   //flexDirection: "column",
            //   //justifyContent: "center",
            //   //alignItems: "stretch",
            //   //width: "35vw",
            //   // height: "10vh important",
            //   borderTop: "2px solid grey",
            //   //marginTop: "15vh",
            // }}
            onSubmit={onSubmit}
          >
            <div
              className="input-field "
              style={{ width: "31vw", marginTop: "5vh", marginBottom: "0" }}
            >
              <i className="material-icons prefix">key</i>
              <input
                id="currpassword"
                type={showPassword ? "text" : "password"}
                name="currpassword"
                value={currpassword}
                className="validate input__field"
                onChange={onChange}
                style={{ height: "40px" }}
              />
              {showPassword ? (
                <i
                  className="material-icons prefix visibility "
                  onClick={onShowPassword}
                >
                  visibility_off
                </i>
              ) : (
                <i
                  className="material-icons prefix visibility"
                  onClick={onShowPassword}
                >
                  visibility
                </i>
              )}
              <label
                className="input__label"
                style={{
                  fontWeight: "bold",
                  marginLeft: "4vw",
                  paddingBottom: "5px",
                }}
                htmlFor="currpassword"
              >
                Enter Current password
              </label>
            </div>
            <div className="input-field " style={{ width: "31vw" }}>
              <i className="material-icons prefix">key</i>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                className="validate input__field"
                onChange={onChange}
                style={{ height: "40px" }}
              />

              {showPassword ? (
                <i
                  className="material-icons prefix visibility "
                  onClick={onShowPassword}
                >
                  visibility_off
                </i>
              ) : (
                <i
                  className="material-icons prefix visibility"
                  onClick={onShowPassword}
                >
                  visibility
                </i>
              )}

              <label
                className="input__label"
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
            <div className="input-field" style={{ width: "31vw" }}>
              <i className="material-icons prefix">password</i>
              <input
                id="password2"
                type="text"
                name="password2"
                value={password2}
                className="validate input__field"
                onChange={onChange}
                style={{
                  paddingLeft: "10px",
                  height: "32px",
                }}
              />
              <label
                className="input__label"
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
              disabled={isPassUpdate ? true : false}
              style={{ width: "23vw", marginLeft: "6vw" }}
            >
              <i className="material-icons">key</i> Confirm Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
