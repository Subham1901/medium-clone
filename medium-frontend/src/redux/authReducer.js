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
    default:
      break;
  }
};

export default authReducer;
