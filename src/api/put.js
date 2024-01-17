import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASE_URL}/user`, payload)
      .then((response) => {
        const { data } = response.data;
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}