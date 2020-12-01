import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../styles/Register.css";
const camera = require("../styles/images/camera-b&w.jpg");

const Signup = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [signedUp, setSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleClick = event => {
    event.preventDefault();

    if (
      (firstName,
      lastName,
      email,
      password,
      repeatPassword && password === repeatPassword)
    ) {
      axios
        .post("http://localhost:9090/users/register", {
          firstName,
          lastName,
          email,
          password
        })
        .then(function(response) {
          setSignUp(true); // changing hook state
          history.push("/login");
        })
        .catch(function(error) {
          if (error.response.status === 400) {
            setError("User with this email already exists");
          } else setError("Server error");
        });
    } else {
      setError("Try again");
    }
  };

  return (
    <div>
      {signedUp ? (
        <h1>User Created</h1>
      ) : (
        <>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <img className="rounded" src={camera} alt=""></img>
              </div>
              <div className="col-md-6 col-sm-12">
                <h1>Sign up here</h1>
                <p>please, fill the form and join our team</p>
                <hr></hr>
                <br></br>

                <form method="POST">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        className="form-control shadow-sm"
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={event => setFirstName(event.target.value)}
                      ></input>
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        className="form-control shadow-sm"
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={event => setLastName(event.target.value)}
                      ></input>
                    </div>
                  </div>
                  <br></br>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        className="form-control shadow-sm"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={event => setEmail(event.target.value)}
                      ></input>
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        className="form-control shadow-sm"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={event => setPassword(event.target.value)}
                      ></input>
                    </div>
                  </div>
                  <br></br>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        className="form-control shadow-sm"
                        type="password"
                        placeholder="Repeat Password"
                        name="repeatPassword"
                        onChange={event =>
                          setRepeatPassword(event.target.value)
                        }
                      ></input>
                    </div>
                  </div>
                  <br></br>
                  <button
                    type="button"
                    className="btn btn-dark ml-4"
                    onClick={handleClick}
                  >
                    CREATE
                  </button>
                </form>

                <br></br>
                <div className="ml-4 mt-5">
                  {" "}
                  <a href="/login">Login here</a>
                </div>

                <h2>{error}</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
