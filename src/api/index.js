import axios from "axios";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export function getData(path) {
  return axios.get(path).then((response) => response.data);
}
