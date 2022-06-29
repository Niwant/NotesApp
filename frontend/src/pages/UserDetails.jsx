import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import { passwordUpdate } from "../features/auth/authSlice";

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
            justifyContent: "center",
            alignItems: "stretch",
            width: "31vw",
            height: "40vh",
          }}
          onSubmit={onSubmit}
        >
          <div className="input-field col s12">
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
          <div className="input-field col s12">
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
          <div className="input-field">
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
