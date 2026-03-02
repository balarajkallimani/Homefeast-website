// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // Get token from localStorage
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  // Set authorization header
  getHeaders: (contentType = 'application/json') => {
    const token = apiClient.getToken();
    const headers: any = {
      'Content-Type': contentType,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  },

  // Fetch wrapper
  async request(endpoint: string, options: any = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      headers: apiClient.getHeaders(options.headers?.['Content-Type'] || 'application/json'),
    };

    try {
      console.log(`📡 API Request: ${config.method || 'GET'} ${url}`);
      const response = await fetch(url, config);
      
      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: response.statusText };
      }

      if (!response.ok) {
        console.error(`❌ API Error ${response.status}:`, data);
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      console.log(`✅ API Success:`, data);
      return data;
    } catch (error: any) {
      console.error('🔴 API Error:', error.message);
      throw new Error(error.message || 'Failed to connect to server. Please ensure backend is running on port 5000.');
    }
  },

  // Auth endpoints
  auth: {
    register: (userData: any) =>
      apiClient.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),

    login: (email: string, password: string) =>
      apiClient.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    getProfile: () => apiClient.request('/auth/me'),

    updateProfile: (userData: any) =>
      apiClient.request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
  },

  // Cooks endpoints
  cooks: {
    getAll: (filters?: any) => {
      const params = new URLSearchParams(filters || {}).toString();
      return apiClient.request(`/cooks${params ? '?' + params : ''}`);
    },

    getById: (id: string) => apiClient.request(`/cooks/${id}`),

    register: (cookData: any) =>
      apiClient.request('/cooks/register', {
        method: 'POST',
        body: JSON.stringify(cookData),
      }),

    update: (id: string, cookData: any) =>
      apiClient.request(`/cooks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(cookData),
      }),
  },

  // Orders endpoints
  orders: {
    getMyOrders: () => apiClient.request('/orders/my-orders'),

    getCookOrders: () => apiClient.request('/orders/cook-orders'),

    create: (orderData: any) =>
      apiClient.request('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }),

    updateStatus: (id: string, status: string) =>
      apiClient.request(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),

    addReview: (id: string, reviewData: any) =>
      apiClient.request(`/orders/${id}/review`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
      }),
  },

  // Menus endpoints
  menus: {
    getByCook: (cookId: string) => apiClient.request(`/menus/cook/${cookId}`),

    create: (menuData: any) =>
      apiClient.request('/menus', {
        method: 'POST',
        body: JSON.stringify(menuData),
      }),

    update: (id: string, menuData: any) =>
      apiClient.request(`/menus/${id}`, {
        method: 'PUT',
        body: JSON.stringify(menuData),
      }),

    delete: (id: string) =>
      apiClient.request(`/menus/${id}`, {
        method: 'DELETE',
      }),
  },

  // Subscriptions endpoints
  subscriptions: {
    getMySubscriptions: () => apiClient.request('/subscriptions/my-subscriptions'),

    getCookSubscriptions: () => apiClient.request('/subscriptions/cook-subscriptions'),

    create: (subscriptionData: any) =>
      apiClient.request('/subscriptions', {
        method: 'POST',
        body: JSON.stringify(subscriptionData),
      }),

    update: (id: string, subscriptionData: any) =>
      apiClient.request(`/subscriptions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(subscriptionData),
      }),

    cancel: (id: string) =>
      apiClient.request(`/subscriptions/${id}/cancel`, {
        method: 'POST',
      }),
  },
};
