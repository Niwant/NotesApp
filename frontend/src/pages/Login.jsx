import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import logo from "../logo.png";
import M from "materialize-css";
function Login() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      M.toast({ html: `${message}` });
    }
    if (isSuccess && user.user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div
        className="row"
        style={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "0%",
          }}
        >
          <img src={logo} alt="" style={{ transform: "scale(0.5)" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "0%",
          }}
        >
          <h4>Log into your Account</h4>
          <p>
            Dont have an account? <a href="/register">Register here</a>
          </p>
        </div>
        <form
          className="col"
          onSubmit={onSubmit}
          style={{
            width: "35vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              className="validate"
              onChange={onChange}
              style={{
                border: "3px solid #283593",
                paddingLeft: "10px",
                height: "32px",
              }}
            />
            <label
              htmlFor="email"
              style={{
                fontWeight: "bold",
                marginLeft: "4vw",
                paddingBottom: "5px",
              }}
            >
              E-mail
            </label>
            <span
              className="helper-text"
              data-error="wrong"
              data-success="right"
            >
              Enter Valid Email Id
            </span>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix">key</i>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              className="validate"
              onChange={onChange}
              style={{ border: "3px solid #283593", height: "32px" }}
            />
            <label
              style={{
                fontWeight: "bold",
                marginLeft: "4vw",
                paddingBottom: "5px",
              }}
              htmlFor="password"
            >
              Enter password
            </label>
          </div>

          <div className="col s3 center ">
            <button
              className="btn waves-effect waves-light indigo darken-3"
              type="submit"
            >
              Login
              <i className="material-icons right">login</i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
