import React from "react";
import { connect } from "react-redux";
import { store } from "../store";
import { push } from "react-router-redux";
import { UPDATE_FIELD_AUTH, REDIRECT, LOGIN } from "../constants/actionTypes";

import "../styles/login.css";

const mapStateToProps = state => ({
	...state.login
});

const mapDispatchToProps = dispatch => ({
	onLoad: authenticated => dispatch({ type: LOGIN, auth: authenticated }),
	onChangeEmail: value =>
		dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
	onChangePassword: value =>
		dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
	onSubmit: (email, password) => dispatch({ type: LOGIN, email, password }),
	onRedirect: () => dispatch({ type: REDIRECT })
});

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
		this.changePassword = ev =>
			this.props.onChangePassword(ev.target.value);
		this.submitForm = (email, password) => ev => {
			ev.preventDefault();
			this.props.onSubmit(email, password);
		};
	}

	componentDidMount() {
		let user = localStorage.getItem("auth");
		this.props.onLoad(user ? true : false);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.redirectTo) {
			store.dispatch(push(nextProps.redirectTo));
			this.props.onRedirect();
		}
	}

	componentDidUpdate() {
		console.log(true);
	}

	render() {
		const email = this.props.email;
		const password = this.props.password;
		let incorrectMsg;

		if (this.props.incorrectLogin) {
			incorrectMsg = (
				<p className="incorrect">Username or Password is Incorrect</p>
			);
		}

		return (
			<div className="login">
				<div className="screen">
					<p className="title">WakeCap</p>
					<form
						className="inputbox"
						id="loginform"
						autoComplete="on"
						onSubmit={this.submitForm(email, password)}
					>
						<div className="input_container">
							<i className="fas fa-user icon" />
							<input
								placeholder="Username"
								type="text"
								name="username"
								autoComplete="username"
								value={email}
								onChange={this.changeEmail}
							/>
						</div>
						<div className="input_container">
							<i className="fas fa-key icon" />
							<input
								placeholder="Password"
								type="password"
								name="password"
								autoComplete="current-password"
								value={password}
								onChange={this.changePassword}
							/>
						</div>
						<div className="input_container submit">
							<button
								type="submit"
								value="Submit"
								className="submit"
							>
								Submit
							</button>
						</div>
					</form>
					{incorrectMsg}
				</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
