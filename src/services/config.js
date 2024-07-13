import axios from "axios";
import {
    turOffLoadingAction,
    turOnLoadingAction,
} from "../redux/action/spinnerAction";
import { store } from "..";
import { getAccessToken } from "./../utils/getAccesToken";

const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NSIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczMjA2MDgwMDAwMCIsIm5iZiI6MTcwMjMxNDAwMCwiZXhwIjoxNzMyMjA4NDAwfQ.8jL30xUvuN74PYnFHxIjmfu65QEtLdvz_dWZnK6QxGk";

export let https = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn",
    headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + getAccessToken(),
    },
});

// axios interceptor
https.interceptors.request.use(
    function (config) {
        store.dispatch(turOnLoadingAction());
        return config;
    },
    function (error) {
        store.dispatch(turOffLoadingAction());
        return Promise.reject(error);
    }
);

https.interceptors.response.use(
    function (response) {
        store.dispatch(turOffLoadingAction());
        return response;
    },
    function (error) {
        store.dispatch(turOffLoadingAction());
        return Promise.reject(error);
    }
);
