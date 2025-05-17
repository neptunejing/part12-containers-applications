import axios from "axios";

const baseUrl = "http://127.0.0.1:3001/api/persons"

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data?.error || error.message;
    });
};

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (newObject) => {
  return axios
    .put(`${baseUrl}/${newObject.id}`, newObject)
    .then((response) => response.data);
  };

export default { getAll, create, deleteById, update };
