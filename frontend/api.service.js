import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 7200000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handlingExeptionError = async (error) => {
  if (axios.isAxiosError(error)) {
    if (error.status === 401) {
      if (typeof window !== "undefined") {
        await logoutHandler();
        window.location.href = "/";
      }
    }
    return {
      data: { message: error.response?.data?.message ?? "An error occurred" },
      status: error.response.status,
    };
  } else {
    return { data: { message: "API Request Failed!" } };
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return handlingExeptionError(error);
  },
);

const authApi = {
  login: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  logout: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  resetPassword: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  forgotPassword: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  updatePassword: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },
};

const userApi = {
  add: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getAll: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getOne: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  update: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  delete: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  uploadProfile: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },
};

const customerApi = {
  getAll: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getOne: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  update: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  delete: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },
};

const customerAddressApi = {
  add: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getAll: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getOne: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  update: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  delete: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },
};

const productApi = {
  add: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getAll: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getOne: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  update: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  delete: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },
};

const categoryApi = {
  add: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getAll: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  getOne: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  update: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },

  delete: async () => {
    try {
    } catch (error) {
      return handlingExeptionError(error);
    }
  },
};

export {
  authApi,
  userApi,
  customerApi,
  customerAddressApi,
  productApi,
  categoryApi,
};
