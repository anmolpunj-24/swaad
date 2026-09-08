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
  login: async (loginData) => {
    const response = await api.post(`/api/admin/login`, loginData);
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
    const response = await api.get("/api/admin/current-user");
    return response;
  },

  uploadProfile: async (file) => {
    const formData = new FormData();
    formData.append("profile", file);
    const response = await api.post("/api/admin/user/upload-profile", formData);
    return response;
  },

  updatePassword: async (passwordData) => {
    const response = await api.post("/api/admin/update-password", passwordData);
    return response;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/api/admin/forgot-password", email);
    return response;
  },

  resetPassword: async (newPassword) => {
    const response = await api.post("/api/admin/reset-password", newPassword);
    return response;
  },
};

const getInfoOnTheBasisOfPincode = async (postalCode) => {
  const response = await axios.get(
    `https://api.postalpincode.in/pincode/${postalCode}`,
  );
  return response;
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
  add: async (userData) => {
    const response = await api.post("/api/admin/user/add", userData);
    return response;
  },

  getAll: async () => {
    const response = await api.get("/api/admin/user/getAll");
    return response;
  },

  getOne: async (uuid) => {
    const response = await api.get(`/api/admin/user/get/${uuid}`);
    return response;
  },

  update: async () => {},

  delete: async () => {},
};

const customerApi = {
  getAll: async () => {},

  getOne: async () => {},

  update: async () => {},

  delete: async () => {},
};

const customerAddressApi = {
  add: async (addressData) => {
    const response = await api.post(
      "/api/auth/customer-address/add",
      addressData,
    );
    return response;
  },

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
  add: async (categoryData) => {
    const response = await api.post("/api/admin/category/add", categoryData);
    return response;
  },

  getAll: async () => {
    const response = await api.get("/api/admin/category/getAll");
    return response;
  },

  getOne: async () => {},

  update: async () => {},

  delete: async () => {},
};

export {
  adminAuthApi,
  getInfoOnTheBasisOfPincode,
  customerAuthApi,
  userApi,
  customerApi,
  customerAddressApi,
  productApi,
  categoryApi,
};
