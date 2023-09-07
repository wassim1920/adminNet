import { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(false); // State for controlling loader visibility

  //the user will be save in all the pages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setShowLoader(true); // Show the loader
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:1920/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setShowLoader(false); // Hide the loader if there is an error
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Email or phone number"
            id="email"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            id="password"
          />
          <button
            disabled={loading}
            onClick={handleClick}
            className="loginButton"
          >
            Sign In
          </button>
          <button
            disabled={loading}
            className="loginButtong"
          >
            <FcGoogle  className="icong"/>
            
          </button>
          
          <span>
            New to Netflix? <Link to="/register"><b>Sign up now.</b></Link>
          </span>
          
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
          {showLoader && (
            <div className="custom-loader">
              <p>Loading...</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
