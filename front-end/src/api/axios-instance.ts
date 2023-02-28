import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4000/",
  responseEncoding: "utf8",
  headers: {
    "Content-Type": "application/json",
    "Accept": "*/*",
    "AcceptEncoding": "gzip, deflate, br",
  },
});