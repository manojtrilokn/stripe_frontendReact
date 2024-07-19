import { LOGIN, LOGOUT, TOKEN_EXPIRE, LOGIN_INPUT_CHANGE } from "../types/types";

export const userLogin = (user_detal) => {
    return {
        type: LOGIN,
        data: user_detal
    };
};

export const userLogout = () => {
    return {
        type: LOGOUT,
        data: null
    };
};
export const userLoginInputChange = () => {
    return {
        type: LOGIN_INPUT_CHANGE,
        data: null
    };
};

export const token_expire = () => {
    return {
        type: TOKEN_EXPIRE,
        data: null
    };
};
