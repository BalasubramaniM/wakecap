import { LOGIN, LOGOUT } from "./constants/actionTypes";

/**
 * Local Storage Middleware.
 * Check for any data in local storage with respect to subreddit and if data exist, return the data.
 */
const loginMiddleware = store => next => action => {
	let defaultEmail = "bala.m@live.in";
	let defaultPassword = "Wake@Cap341";

	if (action.type === LOGIN) {
		if (
			action.email === defaultEmail &&
			action.password === defaultPassword
		) {
			action.auth = true;
			localStorage.setItem("auth", true);
		}
		// To display incorrect login message.
		else if (
			typeof action.email !== "undefined" ||
			typeof action.password !== "undefined"
		) {
			action.incorrectLogin = true;
		}
	}

	// Remove key on Logout from Local Storage.
	if (action.type === LOGOUT) {
		localStorage.removeItem("auth");
	}
	next(action);
};

export { loginMiddleware };
