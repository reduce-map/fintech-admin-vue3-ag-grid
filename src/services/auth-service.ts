import BaseService from './base-service.ts'

export default {
  async login(username: string, password: string) {
    // assuming next would probably do smth like that
    const { data } = await BaseService.post('/login', { username, password })
    return data
  },
}
