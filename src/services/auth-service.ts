import BaseService from './base-service.ts'

// const getMockUser = (username : string = 'reduce-map', password: string = 'hello-world') => {
//   return {
//     token: `your-${password}-token`,
//     role: 'admin',
//     username: username
//   }
// }

export default {
  async login(username: string, password: string) {
    // return getMockUser(username, password);

    // assuming next would probably do smth like that
    const { data } = await BaseService.post('/login', { username, password })
    return data
  },
}
