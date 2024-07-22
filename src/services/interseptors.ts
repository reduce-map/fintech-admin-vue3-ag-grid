// LEAD: leaved here as for example JTW token refresh

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

// import { useAuthStore } from '../store';

// export const errorNotificationHandler = (resp: AxiosError) => {
//     const statusText = resp.response && resp.response.statusText;
//     const errorMessage = statusText ? statusText : Errors.defaultMessage;
//     store.dispatch('notifications/setError', errorMessage);
// };

export const applyInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  // const authStore = useAuthStore();

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      // errorNotificationHandler(error);

      if (error.response && error.response.status !== 401) {
        return Promise.reject(error)
      }

      try {
        // await authStore.validate();

        const config = error.config as AxiosRequestConfig
        // config.headers.Authorization = `Bearer ${authStore.token}`;

        return new Promise<AxiosResponse>((resolve, reject) => {
          axios
            .request(config)
            .then((response: AxiosResponse) => {
              resolve(response)
            })
            .catch((error: AxiosError) => {
              reject(error)
            })
        })
      } catch (err) {
        return Promise.reject(error)
      }
    }
  )

  // Add a request interceptor
  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // config.headers.Authorization = `Bearer ${authStore.token}`;
    return config
  })

  return axiosInstance
}
