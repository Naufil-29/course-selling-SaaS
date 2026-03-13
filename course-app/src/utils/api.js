import axios from 'axios';

const api = axios.create({ 
    baseURL: "https://course-selling-saas.onrender.com",
    withCredentials: true
});

const refreshApi = axios.create({
  baseURL: "https://course-selling-saas.onrender.com",
  withCredentials: true
});

// attach accessToken automatically
api.interceptors.request.use((config) => { 
   const token = localStorage.getItem("accessToken");

   if(token){ 
    config.headers.Authorization = `Bearer ${token}`
   }

   return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const code = error.response?.data?.code;

    if (
      status === 401 &&
      code === "TOKEN_EXPIRED" || code === "jwt malformed" &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh"
    ) {
      originalRequest._retry = true; // ✅ VERY IMPORTANT

      try {
        const refreshResponse = await refreshApi.post(
          "/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.newAccessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`; // ✅ include Bearer

        return api(originalRequest);
      } catch (refreshError) {
        console.log("refresh-error", refreshError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "/"; // ✅ correct usage

        return Promise.reject(refreshError);
      }
    }

    // Any other 401 → logout
    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
