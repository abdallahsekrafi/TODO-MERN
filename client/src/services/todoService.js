import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default {
  getTodos: () => axios.get(`${BASE_URL}/`),
  // getTodos: async () => {
  //   const res = await axios.get(`${BASE_URL}/`);
  //   // Simule un délai de 2 secondes
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   return res;
  // },
  createTodo: (description, isdone) =>
    axios.post(`${BASE_URL}/`, { description, isdone }),
  updateTodo: (id, description, isdone) =>
    axios.put(`${BASE_URL}/${id}`, { description, isdone }),
  deleteTodo: (id) => axios.delete(`${BASE_URL}/${id}`),
};
