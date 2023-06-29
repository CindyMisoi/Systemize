import axios from "axios";

const apiServer = axios.create({
  baseURL: "http://localhost:3000", // Replace with your Rails API server URL
  withCredentials: true, // This enables sending cookies along with the requests
});

export default apiServer;
