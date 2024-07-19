import axios from "axios";
import apiConfig from "../api_configue/apiConfig";
import authHeader from "../api_configue/authHeader"

export const requestOTP = async (data) => {
    return axios.post(apiConfig.API_URL + "requestOTP", data
    ).then((response) => {
        return response.data;
    });
};

export const signUp = async (data) => {
    return axios.post(apiConfig.API_URL + "signUp", data
    ).then((response) => {
        return response.data;
    });
};

export const getProfile = async () => {
    return axios.get(apiConfig.API_URL + "getProfile", {
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};

export const completeProfile = async (user_data) => {
    return axios.post(apiConfig.API_URL + "completeProfile", user_data, {
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};


export const createConnectAccount = async (form_data) => {
    return axios.post(apiConfig.API_URL + "createConnectAccount", form_data, {
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};

export const getConnectAccount = async () => {
    return axios.get(apiConfig.API_URL + "getConnectAccount", {
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};

export const addExternalAccount = async (data) => {
    return axios.post(apiConfig.API_URL + "addExternalAccount", data, {
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};

export const deleteExternalAccount = async (data) => {
    return axios.post(apiConfig.API_URL + "deleteExternalAccount", data, {
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};

export const setDefaultExternalAccount = async (data) => {
    return axios.post(apiConfig.API_URL + "setDefaultExternalAccount", data, {
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};

export const getAddedCards = async () => {
    return axios.post(apiConfig.API_URL + "getAddedCards",{},{
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};
export const addCardToCustomer = async (data) => {
    return axios.post(apiConfig.API_URL + "addCardToCustomer",data,{
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};
export const removeCard = async (data) => {
    return axios.post(apiConfig.API_URL + "removeCard",data,{
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};
export const createPayment = async (data) => {
    return axios.post(apiConfig.API_URL + "createPayment",data,{
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};

export const createPayment2 = async (data) => {
    return axios.post(apiConfig.API_URL + "createPayment2",data,{
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};

export const getConnectAccountList = async () => {
    return axios.get(apiConfig.API_URL + "getConnectAccountList", {
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};


export const createCheckoutSession = async (data) => {
    return axios.post(apiConfig.API_URL + "createCheckoutSession",data,{
        headers: authHeader()
    }).then((response) => {
        return response.data;
    });
};














