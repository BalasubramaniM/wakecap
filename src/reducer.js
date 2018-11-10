import common from "./reducers/common";
import login from "./reducers/login";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

export default combineReducers({
	common,
	login,
	router: routerReducer
});
