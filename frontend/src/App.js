import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import UserDetails from "./pages/UserDetails";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/home"
              element={!user ? <Navigate replace to="/" /> : <Dashboard />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate replace to="/home" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate replace to="/home" />}
            />
            <Route
              path="/"
              element={!user ? <Home /> : <Navigate replace to="/home" />}
            />
            <Route
              path="/userdetails"
              element={user ? <UserDetails /> : <Navigate replace to="/" />}
            />
            <Route
              path="*"
              element={
                user ? (
                  <Navigate replace to="/home" />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
          </Routes>
        </div>
        ;
      </Router>
    </>
  );
}

export default App;
