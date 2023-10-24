import { setInfo } from "../action/userAction";

let user = JSON.parse(localStorage.getItem("USER"));

const initialState = {
    info: user,
};

export let userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case setInfo: {
            return { ...state, info: payload };
        }
        default:
            return state;
    }
};
