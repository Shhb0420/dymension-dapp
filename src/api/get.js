import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/user`)
      .then((response) => {
        const { data } = response.data;
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const getUserByAddress = (address) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/user/${address}`)
      .then((response) => {
        const { data } = response.data;
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const getListItem = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/item`)
      .then((response) => {
        const { data } = response.data
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getBidItem = (idItem) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/bid/${idItem}`)
      .then((response) => {
        const { data } = response.data
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}