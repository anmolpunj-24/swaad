import axios from "axios";

const api = axios.create({
  baseURL: "",
  timeout: 7200000,
});

const handlingExeptionError = async (error) => {
  if (!axios.isAxiosError(error)) {
    return {
      data: { message: "API Request Failed!" },
    };
  }

  const status = error.response?.status;
  const requestUrl = error.config?.url;

  if (
    status === 401 &&
    (requestUrl !== "/api/admin/login" || requestUrl !== "/api/admin/logout")
  ) {
    // if (typeof window !== "undefined") {
    //   localStorage.removeItem("accessToken");
    //   await logoutHandler();
    //   window.location.href = "/";
    // }
  }

  return {
    data: {
      message: error.response?.data?.message ?? "An error occurred",
    },
    status,
  };
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

  me: async () => {
    const response = await api.get("/api/admin/me");
    return response;
  },
};

const customerAuthApi = {
  login: async () => {},

  logout: async () => {},

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
