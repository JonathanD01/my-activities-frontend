import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/activities"
    : "http://localhost:8080/api/v1/activities";

function getToken() {
  return localStorage.getItem("token");
}

export async function getActivities(page, size) {
  const token = getToken();

  if (!token) {
    throw new Error("Token is null");
  }

  return axios({
    method: "get",
    url: API_URL + `?page=${page}&size=${size}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateActivity(id, body) {
  const token = getToken();

  if (!token) {
    throw new Error("Token is null");
  }

  return axios({
    method: "patch",
    url: API_URL + `/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
  });
}

export async function createActivity(body) {
  const token = getToken();

  if (!token) {
    throw new Error("Token is null");
  }

  return axios({
    method: "post",
    url: API_URL,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
  });
}

export async function deleteActivity(id) {
  const token = getToken();

  if (!token) {
    throw new Error("Token is null");
  }

  return axios({
    method: "delete",
    url: API_URL + `/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}
