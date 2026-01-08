declare module './api.js' {
  interface ApiClient {
    get<T = Record<string, unknown>>(endpoint: string): Promise<T>;
    request<T = Record<string, unknown>>(endpoint: string, options?: RequestInit): Promise<T>;
  }

  export const apiClient: ApiClient;
  export default apiClient;
}
