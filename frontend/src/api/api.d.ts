declare module './api.js' { 
  interface ApiClient { 
    get<T = any>(endpoint: string): Promise<T>;
    request<T = any>(endpoint: string, options?: RequestInit): Promise<T>;
  }

  export const apiClient: ApiClient;
  export default apiClient;
}
