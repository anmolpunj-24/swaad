import axios from "axios";

const api = axios.create({
  baseURL: "",
  timeout: 7200000,
});

const handlingExeptionError = async (error) => {
  if (!axios.isAxiosError(error)) {
    return { data: { message: "API Request Failed!" } };
  }

  const status = error.response?.status;
  const requestUrl = error.config?.url;

  const isLoginRoute = requestUrl.includes("/api/admin/login");

  if (status === 401 && !isLoginRoute) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");

      window.location.href = "/";
    }
  }

  if (status === 500) {
    if (typeof window !== "undefined") {
      window.location.href = "/500";
    }
  }

  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return handlingExeptionError(error);
  },
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

const adminAuthApi = {
  login: async (email, password) => {
    const response = await api.post(`/api/admin/login`, {
      email,
      password,
    });
    return response;
  },

  logoutCurrentDevice: async () => {
    const response = await api.post(`/api/admin/logout-current-device`);
    return response;
  },

  logoutAllDevices: async () => {
    const response = await api.post(`/api/admin/logout-all-devices`);
    return response;
  },

  currentUser: async () => {
    const response = await api.get("/api/admin/currentUser");
    return response;
  },
};

const customerAuthApi = {
  login: async () => {},

  logoutCurrentDevice: async () => {},

  logoutAllDevices: async () => {},

  resetPassword: async () => {},

  forgotPassword: async () => {},

  updatePassword: async () => {},
};

const userApi = {
  add: async () => {},

  getAll: async () => {},

  getOne: async () => {},

  update: async () => {},

  delete: async () => {},

  uploadProfile: async () => {},
};

const customerApi = {
  getAll: async () => {},

  getOne: async () => {},

  update: async () => {},

  delete: async () => {},
};

const customerAddressApi = {
  add: async () => {},

  getAll: async () => {},

  getOne: async () => {},

  update: async () => {},

  delete: async () => {},
};

const productApi = {
  add: async () => {},

  getAll: async () => {},

  getOne: async () => {},

  update: async () => {},

  delete: async () => {},
};

const categoryApi = {
  add: async () => {},

  getAll: async () => {},

  getOne: async () => {},

  update: async () => {},

  delete: async () => {},
};

export {
  adminAuthApi,
  customerAuthApi,
  userApi,
  customerApi,
  customerAddressApi,
  productApi,
  categoryApi,
};
