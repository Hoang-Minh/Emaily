import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <Route path="/" exact component={Landing}></Route>
            <Route path="/surveys" exact component={Dashboard}></Route>
            <Route path="/surveys/new" exact component={SurveyNew}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
