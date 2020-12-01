import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
const bgImage = require("../styles/images/bg.jpg");

const Login = ({ setIsAuth }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleClick = event => {
    event.preventDefault();
    if (email && password) {
      axios({
        method: "post",
        url: "http://localhost:9090/users/login",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data: {
          email,
          password
        }
      })
        .then(function(res) {
          if (res.status === 200) {
            console.log(res);
            setIsAuth(true);
          }
        })
        .then(() => {
          history.replace("/profile");
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      setError("Invalid Data");
    }
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <img className="rounded" src={bgImage} alt=""></img>
          </div>

          <div className="col-md-6 col-sm-12">
            <h1>Welcome back !</h1>
            <hr></hr>
            <br></br>
            <form method="POST">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    placeholder="Enter your email"
                    id="postEmailInput"
                    className="form-control shadow-sm"
                    type="email"
                    required
                    onChange={event => setEmail(event.target.value)}
                  ></input>
                </div>
                <br></br>
                <div className="form-group col-md-6">
                  <input
                    placeholder="Enter your password"
                    id="postPasswordInput"
                    className="form-control  shadow-sm"
                    type="password"
                    required
                    onChange={event => setPassword(event.target.value)}
                  ></input>
                </div>
              </div>
              <br></br>
              <button
                type="button"
                className="btn btn-dark ml-4"
                onClick={handleClick}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>

      <h2>{error}</h2>
    </>
  );
};
export default Login;
