import axios from "axios";
import { history } from "../index";
import Axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

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

// undefined would be the function for any 200 level response codes.
axios.interceptors.response.use(undefined, async (error) => {
  const { status, headers } = error.response;

  if (status === 401 && headers["token-expired"] === "true") {
    const jwt = localStorage.getItem("jwt");
    const response = await axios.post("user/getnewtoken", { jwt });

    if (!response.status === 200) {
      history.push("/login");
      alert("Your session has expired, please login again.");
    }

    localStorage.setItem("jwt", response.data.jwtToken);
    return Axios.request(error.config);
  }

  if (status === 401) {
    history.push("/login");
    alert("Your session has expired, please login again.");
  }

  return Promise.reject(error);
});

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Feedlots = {
  list: () => axios.get("/feedlot").then(responseBody),
  details: (id) => requests.get(`/feedlot/${id}`),
  cookie: () => requests.post("/feedlot/cookie", {}).then(responseBody),
};

const Users = {
  login: (user) => axios.post("/user/login", user),
  register: (user) => axios.post("/user/register", user),
};

export default { Feedlots, Users };
