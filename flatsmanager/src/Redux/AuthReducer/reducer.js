import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOGOUT,
} from "./actionTypes";

export const initState = {
  user: {},
  error: "",
  isAuth: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        error: "",
        user: ""
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.auth,
        error: "",
        user: action.payload,
        isAuth: true,
        accessToken: action.payload.accessToken
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        error: "",
        user: ""
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: "",
        user: action.payload,
        isAuth: true
      };

    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: {}
      }
    default:
      return state;
  }
}

export default reducer