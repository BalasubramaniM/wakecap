import { UPDATE_FIELD_AUTH, LOGIN } from "../constants/actionTypes";

const defaultState = {
    auth: false,
    email: "",
    password: "",
    incorrectLogin: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                redirectTo: action.auth ? "/" : null,
                auth: action.auth,
                incorrectLogin: action.incorrectLogin
                    ? action.incorrectLogin
                    : false
            };
        case UPDATE_FIELD_AUTH:
            return {
                ...state,
                [action.key]: action.value,
                incorrectLogin: false,
                auth: false
            };
        default:
            return state;
    }
};
