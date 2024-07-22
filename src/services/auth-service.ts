import BaseService from './base-service.ts'

export default {
  async login(username: string, password: string) {
    const { data } = await BaseService.post(`/login`, { username, password })
    return data
  },
}
