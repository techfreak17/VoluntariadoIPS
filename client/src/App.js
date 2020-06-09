import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import EntityRoute from "./components/private-route/EntityRoute";
import AdminRoute from "./components/private-route/AdminRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Create from './components/projects/Create';
import Edit from './components/projects/Edit';
import IndexProjects from './components/projects/Index';
import ProjectDetails from './components/projects/ProjectDetails';
import Recover from "./components/auth/Recover";
import RecoverConfirm from "./components/auth/RecoverConfirm";
import IndexUsers from './components/users/IndexUsers';
import CreateCompanyUser from './components/users/CreateCompanyUser';
import CreateVoluntaryUser from './components/users/CreateVoluntaryUser';
import EditVoluntary from './components/users/EditVoluntary';
import EditCompany from './components/users/EditCompany';
import UserDetails from './components/users/UserDetails';
import ConfirmAccount from "./components/auth/ConfirmAccount";
import ConfirmAccountToken from "./components/auth/ConfirmAccountToken";
import ResetPassword from "./components/auth/ResetPassword";
import Menu from "./components/layout/Menu";
import RegisterVoluntary from "./components/auth/RegisterVoluntary";
import RegisterCompany from "./components/auth/RegisterCompany";
import baseVoluntaryProfile from "./components/profile/baseVoluntaryProfile";
import editVoluntaryProfile from "./components/profile/editVoluntaryProfile";
import baseCompanyProfile from "./components/profile/baseCompanyProfile";
import editCompanyProfile from "./components/profile/editCompanyProfile";
import baseAdminProfile from "./components/profile/baseAdminProfile";
import editAdminProfile from "./components/profile/editAdminProfile";
import IndexSubmitedProjects from "./components/submitedProjects/IndexSubmitedProjects";
import CreateSubmitedProject from "./components/submitedProjects/CreateSubmitedProject";
import SubmitedProjectDetails from "./components/submitedProjects/SubmitedProjectDetails";

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
            <Route exact path="/registerVoluntary" component={RegisterVoluntary} />
            <Route exact path="/registerCompany" component={RegisterCompany} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recover" component={Recover} />
            <Route exact path="/recoverconfirm" component={RecoverConfirm} />
            <Route exact path="/ConfirmAccount" component={ConfirmAccount} />
            <Route exact path="/ConfirmAccountToken/:token" component={ConfirmAccountToken} />
            <Route exact path="/resetpassword/:token" component={ResetPassword} />
            <Route exact path="/baseVoluntaryProfile/:id" component={baseVoluntaryProfile}/>
            <Route exact path="/baseCompanyProfile/:id" component={baseCompanyProfile}/>
            <Route exact path="/baseAdminProfile/:id" component={baseAdminProfile}/>
            <Route exact path="/editVoluntaryProfile/:id" component={editVoluntaryProfile}/>
            <Route exact path="/editCompanyProfile/:id" component={editCompanyProfile}/>
            <Route exact path="/editAdminProfile/:id" component={editAdminProfile}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <EntityRoute exact path='/createProject' component={ Create } />
              <EntityRoute path='/editProject/:id' component={ Edit } />
              <PrivateRoute path='/listProjects' component={ IndexProjects } />
              <AdminRoute exact path='/createCompanyUser' component={ CreateCompanyUser } />
              <AdminRoute exact path='/createVoluntaryUser' component={ CreateVoluntaryUser } />
              <PrivateRoute path='/editVoluntary/:id' component={ EditVoluntary } />
              <PrivateRoute path='/editCompany/:id' component={ EditCompany } />
              <PrivateRoute path='/getProject/:id' component={ ProjectDetails } />
              <EntityRoute path='/getUser/:id' component={ UserDetails } />
              <EntityRoute path='/listUsers' component={ IndexUsers } />
              <AdminRoute path='/listSubmitedProjects' component={ IndexSubmitedProjects } />
              <EntityRoute path='/submitProject' component={ CreateSubmitedProject } />
              <AdminRoute path='/getSubmitedProject/:id' component={ SubmitedProjectDetails } />
            </Switch>

          </div>
          </Router>
      </Provider>
    );
  }
}
export default App;