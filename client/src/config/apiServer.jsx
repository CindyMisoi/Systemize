import axios from "axios";

const sessionToken = sessionStorage.getItem("session_token"); // Replace with the actual session token value

const apiServer = axios.create({
  baseURL: "http://localhost:3000", // Replace with your Rails API server URL
  withCredentials: true,
});

apiServer.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken;

export default apiServer;
