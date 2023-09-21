import { combineReducers } from "redux";

const authReducer = (
  state = {
    user: {},
    isLoggedin: false,
    loading: false,
    isSignedup: false,
    error: null,
    signedupStatus: null,
  },
  action
) => {
  switch (action.type) {
    case "USER_SIGNUP":
      return { ...state, loading: true };
    case "USER_LOGIN":
      return { ...state, loading: true };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        isSignedup: true,
        signedupStatus: action.payload,
        error: null,
      };
    case "SIGNUP_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        isSignedup: false,
        signedupStatus: null,
        isLoggedin: true,
        user: action.payload,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isSignedup: false,
        signedupStatus: null,
        isLoggedin: false,
        user: null,
      };
    case "LOGOUT":
      localStorage.removeItem("mediumv1");
      return {
        ...state,
        loading: false,
        error: null,
        isSignedup: false,
        signedupStatus: null,
        isLoggedin: false,
        user: null,
      };
    case "KEEP_LOGIN":
      return {
        ...state,
        loading: false,
        error: null,
        isSignedup: false,
        signedupStatus: null,
        isLoggedin: true,
        user: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const postReducer = (
  state = { isPublished: null, loading: null, error: null, success: null },
  action
) => {
  switch (action.type) {
    case "ADD_POST":
      return { ...state, loading: true };
    case "POST_PUBLISHED":
      return {
        ...state,
        isPublished: true,
        loading: false,
        error: null,
        success: "Congratss!! Your post published successfully",
      };
    case "POST_FAILED":
      return {
        ...state,
        isPublished: false,
        loading: false,
        error: action.payload,
        success: null,
      };
    case "CLEAR_POST_ERROR":
      return {
        ...state,
        error: null,
      };
    case "CLEAR_POST_SUCCESS_MESSAGE":
      return {
        ...state,
        error: null,
        success: null,
        isPublished: null,
        loading: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

export default rootReducer;
