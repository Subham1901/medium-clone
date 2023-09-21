import { MEDIUMAPI } from "./API";

export const signUP = async (userinfo) => {
  try {
    let response = await MEDIUMAPI.post("/signup", userinfo);
    let statusText = response.statusText;
    return { statusText };
  } catch (failure) {
    let message = failure?.response?.data?.message;
    if (!message) {
      message = failure?.message;
    }

    return { message };
  }
};

export const login = async (userinfo) => {
  try {
    let { data } = await MEDIUMAPI.post("/login", userinfo);
    localStorage.setItem("mediumv1", JSON.stringify(data[0]));
    return { data };
  } catch (failure) {
    let message = failure?.response?.data?.message;
    if (!message) {
      message = failure?.message;
    }

    return { message };
  }
};
