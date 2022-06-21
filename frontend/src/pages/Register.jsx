import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
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
      <div className="row">
        <form className="col s6 offset-s3 z-depth-4" onSubmit={onSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                className="validate"
                onChange={onChange}
              />
              <label htmlFor="name">Enter Full Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                className="validate"
                onChange={onChange}
              />
              <label htmlFor="email">E-mail</label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Enter Valid Email Id
              </span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">password</i>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                className="validate"
                onChange={onChange}
              />
              <label htmlFor="password">Enter password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">password</i>
              <input
                id="password2"
                type="password"
                name="password2"
                value={password2}
                className="validate"
                onChange={onChange}
              />
              <label htmlFor="password2">Confirm password</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12 center">
              <button
                className="btn waves-effect waves-light btn-large "
                type="submit"
              >
                register
                <i className="material-icons right">person</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
