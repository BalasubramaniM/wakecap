import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "./Login";

import "../styles/style.css";

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/" component={Home} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default connect(
	null,
	null
)(App);
