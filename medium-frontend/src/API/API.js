import axios from "axios";

export const MEDIUMAPI = axios.create({
  baseURL: "http://localhost:8080/medium",
});
