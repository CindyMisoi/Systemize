import axios from "axios";

const sessionToken = sessionStorage.getItem("session_token"); // Replace with the actual session token value


// Create a function to generate Axios instances for different modules
function createModuleAxios() {
  const axiosApi= axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add interceptors for authentication
  moduleAxios.interceptors.request.use(
    (config) => {
      const token = sessionToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosApi;
}
const apiServer  = createModuleAxios();

export { apiServer };