import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Feedlots = {
  list: () => axios.get("/feedlot").then(responseBody),
  details: (id) => requests.get(`/feedlot/${id}`),
};

const Users = {
  login: (user) => axios.post("/user/login", user),
  register: (user) => axios.post("/user/register", user),
};

export default { Feedlots, Users };
