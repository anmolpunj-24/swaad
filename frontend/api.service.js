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
    config.headers.authorization = token;
  }

  return config;
});

export const dashboardApi = async (month, year) => {
  const response = await api.get("/api/admin/dashboard", {
    params: { month, year },
  });

  return response;
};

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

  delete: async (uuid) => {
    const response = await api.delete(`/api/admin/user/delete/${uuid}`);
    return response;
  },
};

const customerApi = {
  getAll: async () => {
    const response = await api.get("/api/auth/customer/getAll");
    return response;
  },

  getOne: async (uuid) => {
    const response = await api.get(`/api/auth/customer/get/${uuid}`);
    return response;
  },

  update: async (uuid, updateCustomerData) => {
    const response = await api.put(
      `/api/auth/customer/update/${uuid}`,
      updateCustomerData,
    );
    return response;
  },
};

const productApi = {
  add: async (productData) => {
    const response = await api.post("/api/admin/product/add", productData);
    return response;
  },

  getAll: async () => {
    const response = await api.get("/api/admin/product/getAll");
    return response;
  },

  getOne: async (id) => {
    const response = await api.get(`/api/admin/product/get/${id}`);
    return response;
  },

  update: async (id, updateProductData) => {
    const response = await api.put(
      `/api/admin/product/update/${id}`,
      updateProductData,
    );
    return response;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/admin/product/delete/${id}`);
    return response;
  },
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

  getOne: async (id) => {
    const response = await api.get(`/api/admin/category/get/${id}`);
    return response;
  },

  update: async (id, updateCategoryData) => {
    const response = await api.put(
      `/api/admin/category/update/${id}`,
      updateCategoryData,
    );
    return response;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/admin/category/delete/${id}`);
    return response;
  },
};

const pageSeoApi = {
  add: async (pageSeoData) => {
    const response = await api.post("/api/admin/seo/add", pageSeoData);
    return response;
  },

  getAll: async () => {
    const response = await api.get("/api/admin/seo/getAll");
    return response;
  },

  getOne: async (slug) => {
    const response = await api.get(`/api/admin/seo/get/${slug}`);
    return response;
  },

  update: async (slug, updatePageSeoData) => {
    const response = await api.put(
      `/api/admin/seo/update/${slug}`,
      updatePageSeoData,
    );
    return response;
  },

  delete: async (slug) => {
    const response = await api.delete(`/api/admin/seo/delete/${slug}`);
    return response;
  },
};

const pageFaqApi = {
  add: async (pageFaqData) => {
    const response = await api.post("/api/admin/faq/add", pageFaqData);
    return response;
  },

  getAll: async () => {
    const response = await api.get("/api/admin/faq/getAll");
    return response;
  },

  getOne: async (pageSlug) => {
    const response = await api.get(`/api/admin/faq/get/${pageSlug}`);
    return response;
  },

  update: async (pageSlug, updatePageFaqData) => {
    const response = await api.put(
      `/api/admin/faq/update/${pageSlug}`,
      updatePageFaqData,
    );
    return response;
  },

  delete: async (pageSlug) => {
    const response = await api.delete(`/api/admin/faq/delete/${pageSlug}`);
    return response;
  },
};

const orderApi = {
  getAll: async () => {
    const response = await api.get("/api/auth/orders/getAll");
    return response;
  },

  getOne: async (id) => {
    const response = await api.get(`/api/auth/orders/get/${id}`);
    return response;
  },
};

const tagApi = {
  add: async (tagData) => {
    const response = await api.post("/api/admin/tag/add", tagData);
    return response;
  },

  getAll: async () => {
    const response = await api.get("/api/admin/tag/getAll");
    return response;
  },

  getOne: async (id) => {
    const response = await api.get(`/api/admin/tag/get/${id}`);
    return response;
  },

  update: async (id, updateTagData) => {
    const response = await api.put(
      `/api/admin/tag/update/${id}`,
      updateTagData,
    );
    return response;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/admin/tag/delete/${id}`);
    return response;
  },
};

const couponApi = {
  add: async (couponData) => {
    const response = await api.post("/api/admin/coupon/add", couponData);
    return response;
  },

  getAll: async () => {
    const response = await api.get("/api/admin/coupon/getAll");
    return response;
  },

  getOne: async (id) => {
    const response = await api.get(`/api/admin/coupon/get/${id}`);
    return response;
  },

  update: async (id, updateCouponData) => {
    const response = await api.put(
      `/api/admin/coupon/update/${id}`,
      updateCouponData,
    );
    return response;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/admin/coupon/delete/${id}`);
    return response;
  },
};

const blogApi = {
  add: async (formData) => {
    return await api.post("/api/admin/blog/add", formData);
  },

  getAll: async () => {
    return await api.get("/api/admin/blog/getAll");
  },

  getOne: async (id) => {
    return await api.get(`/api/admin/blog/get/${id}`);
  },

  update: async (id, formData) => {
    return await api.put(`/api/admin/blog/update/${id}`, formData);
  },

  delete: async (id) => {
    return await api.delete(`/api/admin/blog/delete/${id}`);
  },
};

export {
  adminAuthApi,
  userApi,
  customerApi,
  productApi,
  categoryApi,
  pageSeoApi,
  pageFaqApi,
  orderApi,
  tagApi,
  couponApi,
  blogApi,
  dashboardApi,
};
