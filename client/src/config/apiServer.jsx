import axios from "axios";
import { backendUrl } from "./index";

const apiServer = axios.create({
  baseURL: backendUrl, // Replace with your Rails API server URL
  withCredentials: true, // This enables sending cookies along with the requests
});

export default apiServer;
