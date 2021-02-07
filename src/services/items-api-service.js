import TokenService from './token-service';
import config from '../config';

const ItemsApiService = {
  getItems(pollId) {
    return fetch(`${config.API_BASE_URL}/items/poll/${pollId}`)
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()));
  },

  postItems(pollId, items) {
    const headers = { 'content-type': 'application/json' };
    if (TokenService.hasUnexpiredAuthToken()) {
      headers.Authorization = `Bearer ${TokenService.getAuthToken()}`;
    }

    return fetch(`${config.API_BASE_URL}/items/poll/${pollId}`, {
      headers,
      method: 'POST',
      body: JSON.stringify(items),
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()));
  },

  deleteItem(itemId) {
    return fetch(`${config.API_BASE_URL}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.ok));
  },

  incrementVote(itemId) {
    return fetch(`${config.API_BASE_URL}/items/vote/${itemId}`, {
      method: 'PATCH',
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.ok));
  },

  resetVotes(pollId) {
    return fetch(`${config.API_BASE_URL}/items/resetVotes/${pollId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.ok));
  },
};

export default ItemsApiService;
