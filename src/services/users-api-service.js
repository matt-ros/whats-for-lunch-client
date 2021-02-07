import TokenService from './token-service';
import config from '../config';

const UsersApiService = {
  postUser(user) {
    return fetch(`${config.API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()));
  },

  getUser() {
    return fetch(`${config.API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()));
  },
};

export default UsersApiService;
