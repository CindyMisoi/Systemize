import axios from "axios";

const sessionToken = sessionStorage.getItem("session_token"); // Replace with the actual session token value

const apiServer = axios.create({
  // baseURL: "https://systemize-api.onrender.com", // Replace with your Rails API server URL
  baseURL: "http://127.0.0.1:3000", // Replace with your Rails API server URL
  // withCredentials: false,
});

apiServer.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken;

export default apiServer;
