import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import logo from "../logo.png";
import M from "materialize-css";
function Register() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
    if (isSuccess || user) {
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
    if (password !== password2) {
      M.toast({ html: "Pasword not matching" });
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
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
          <img
            src={logo}
            alt=""
            style={{ transform: "scale(0.5)", cursor: "pointer" }}
          />
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
          <h4>Let's create your Acccount</h4>
          <p>
            Already have an account ?<a href="/login"> Log In</a>
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
            <i className="material-icons prefix">account_circle</i>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
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
              htmlFor="name"
            >
              Enter Full Name
            </label>
          </div>

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
              style={{
                fontWeight: "bold",
                marginLeft: "4vw",
                paddingBottom: "5px",
              }}
              htmlFor="email"
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
              Enter password
            </label>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix">password</i>
            <input
              id="password2"
              type="password"
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
              Confirm password
            </label>
          </div>

          <div className="col s3 center">
            <button
              className="btn waves-effect waves-light indigo darken-3"
              type="submit"
            >
              register
              <i className="material-icons right">person</i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
