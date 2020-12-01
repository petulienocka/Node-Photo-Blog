import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { authenticate } from "./functions/auth";
import PrivateRoute from "./components/PrivateRoute";
import PhotoList from "./pages/PhotoList";
import Header from "./components/Header";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    authenticate(setIsAuth);
  }, []);
  return (
    <Router>
      <div className="App">
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <Switch>
          <Route exact path="/home" component={props => <Home />}></Route>
          <Route path="/signup" component={props => <Signup />}></Route>
          <Route
            path="/login"
            component={props => <Login setIsAuth={setIsAuth} />}
          ></Route>
          <PrivateRoute
            path="/profile"
            isAuth={isAuth}
            component={props => <Profile />}
          ></PrivateRoute>
          <Route path="/list" component={props => <PhotoList />}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
