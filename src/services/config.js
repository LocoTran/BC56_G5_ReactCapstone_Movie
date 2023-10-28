import axios from "axios";
import {
  turOffLoadingAction,
  turOnLoadingAction,
} from "../redux/action/spinnerAction";
import { store } from "..";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NiIsIkhldEhhblN0cmluZyI6IjAzLzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMjEwMjQwMDAwMCIsIm5iZiI6MTY4MzMwNjAwMCwiZXhwIjoxNzEyMjUwMDAwfQ.YeDhc_oSixV2XtFPDzcpxFhBos5832JpQpndHNoqZLk";

export let https = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// axios interceptor
https.interceptors.request.use(
  function (config) {
    store.dispatch(turOnLoadingAction());
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  function (response) {
    store.dispatch(turOffLoadingAction());
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
