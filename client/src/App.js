import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Beers from "./pages/Beers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminReviews from "./AdminReviews";
import User from "./AdminReviews";
import AdminReviews from "./User";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import {/* getCookie, */ authenticateUser} from "./utils/handleSessions";


class App extends React.Component {
  // check cookie
  // getCookie();

  state = {
    authenticated: false,
    loading: false
  }

  authenticate = () => authenticateUser()
    .then(auth => this.setState({authenticated: auth.data, loading:false}))
    .catch(err => console.log(err))

  componentWillMount(){
    this.authenticate();
  }
  
  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={  (props) => (
      this.state.authenticated === true 
        ? <Component {...props} />
        : this.state.loading === true
          ?<div></div>
          : <Redirect to='/' />
    )} />
  )

  render(){
    return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />} />
          <Route exact path="/signup"  render={(props) => <Signup {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />} />
          <Route exact path="/adminreviews"  render={(props) => <AdminReviews {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />} />
          <this.PrivateRoute exact path="/user" component={User} />
          <this.PrivateRoute exact path="/beers" component={Beers} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )}
}

export default App;
