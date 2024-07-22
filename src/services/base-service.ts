import axios, { AxiosInstance } from 'axios'

const baseURL: string = import.meta.env.VITE_APP_API_URL
console.log('baseURL:', baseURL)
console.log('baseURL:', import.meta.env)
debugger

const BaseService: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
})

export default BaseService
