const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/api";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    fetchApi("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: (token: string) =>
    fetchApi("/auth/me", { token }),
};

// Orders API
export const ordersApi = {
  list: (token: string) =>
    fetchApi("/orders", { token }),

  get: (id: string, token: string) =>
    fetchApi(`/orders/${id}`, { token }),

  create: (data: unknown, token: string) =>
    fetchApi("/orders", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),
};
