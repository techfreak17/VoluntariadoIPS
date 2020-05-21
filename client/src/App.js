import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Create from './components/projects/Create';
import Edit from './components/projects/Edit';
import Index from './components/projects/Index';
import Recover from "./components/auth/Recover";
import RecoverConfirm from "./components/auth/RecoverConfirm";
import IndexUsers from './components/users/IndexUsers';
import CreateUser from './components/users/CreateUser';
import EditUser from './components/users/EditUser';
import ConfirmAccount from "./components/auth/ConfirmAccount";
import ConfirmAccountToken from "./components/auth/ConfirmAccountToken";
import ResetPassword from "./components/auth/ResetPassword";
import Menu from "./components/layout/Menu";

// Check for token to keep user logged in
if (localStorage.jwtToken) {

  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {

    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Menu />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recover" component={Recover} />
            <Route exact path="/recoverconfirm" component={RecoverConfirm} />
            <Route exact path="/ConfirmAccount" component={ConfirmAccount} />
            <Route exact path="/ConfirmAccountToken/:token" component={ConfirmAccountToken} />
            <Route exact path="/resetpassword/:token" component={ResetPassword} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path='/createProject' component={ Create } />
              <PrivateRoute path='/editProject/:id' component={ Edit } />
              <PrivateRoute path='/listProjects' component={ Index } />
              <PrivateRoute exact path='/createUser' component={ CreateUser } />
              <PrivateRoute path='/editUser/:id' component={ EditUser } />
              <PrivateRoute path='/listUsers' component={ IndexUsers } />
            </Switch>

          </div>
          </Router>
      </Provider>
    );
  }
}
export default App;