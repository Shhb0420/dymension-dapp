import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/user/auth/login`, payload)
      .then((response) => {
        const { data } = response.data;
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const createItem = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/item`, payload)
      .then((response) => {
        const { data } = response.data
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}