import React from "react";
import { logout } from "../functions/logout";
import { useHistory } from "react-router-dom";
import "../styles/Header.css";

const Header = props => {
  const history = useHistory();
  const { isAuth, setIsAuth } = props;

  const handleClick = () => {
    logout(setIsAuth);
    history.replace("/login");
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
      <a className="navbar-brand w-100 ml-5" href="/home">
        Photo Blog
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="collapsibleNavbar">
        <ul className="navbar-nav text-center">
          {isAuth ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item ">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
