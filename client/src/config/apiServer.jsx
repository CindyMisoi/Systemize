import axios from "axios";

const sessionToken = sessionStorage.getItem("session_token"); // Replace with the actual session token value

const apiServer = axios.create({
  baseURL: "https://systemize.onrender.com", // Replace with your Rails API server URL
});

apiServer.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken;
 
export default apiServer;
