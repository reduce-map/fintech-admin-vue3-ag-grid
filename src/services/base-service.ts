import axios, { AxiosInstance } from 'axios'

const baseURL: string = import.meta.env.VITE_APP_API_URL
console.log('baseURL:', baseURL)
debugger

const BaseService: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
})

export default BaseService
