import { MEDIUMAPI } from "./API";

export const postStory = async (postData) => {
  try {
    let response = await MEDIUMAPI.post("/post/create", postData);
    let statusText = response.statusText;
    console.log(response);
    return { statusText };
  } catch (failure) {
    let message = failure?.response?.data?.message;
    console.log(message);
    if (!message) {
      message = failure?.message;
    }

    return { message };
  }
};
