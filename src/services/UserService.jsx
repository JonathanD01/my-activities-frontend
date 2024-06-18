import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/auth"
    : "http://localhost:8080/api/v1/auth";

export async function register(body) {
  return axios({
    method: "post",
    url: API_URL + "/register",
    headers: {},
    data: body,
  });
}

export async function activateAccount(token) {
  return axios({
    method: "post",
    url: API_URL + "/activate-account",
    headers: {},
    data: {
      token: token,
    },
  });
}

export async function authenticate(body) {
  return axios({
    method: "post",
    url: API_URL + "/authenticate",
    headers: {},
    data: body,
  });
}
