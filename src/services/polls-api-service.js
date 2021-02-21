import TokenService from './token-service';
import config from '../config';

const PollsApiService = {
  getPolls() {
    return fetch(`${config.API_BASE_URL}/polls`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()));
  },

  postPoll(poll, newItems) {
    const headers = { 'content-type': 'application/json' };
    if (TokenService.hasUnexpiredAuthToken()) {
      headers.Authorization = `Bearer ${TokenService.getAuthToken()}`;
    }

    return fetch(`${config.API_BASE_URL}/polls`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ poll, newItems }),
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()));
  },

  getPoll(pollId) {
    return fetch(`${config.API_BASE_URL}/polls/${pollId}`)
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()));
  },

  patchPoll(pollId, updateFields) {
    return fetch(`${config.API_BASE_URL}/polls/${pollId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateFields),
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.ok));
  },

  deletePoll(pollId) {
    return fetch(`${config.API_BASE_URL}/polls/${pollId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.ok));
  },
};

export default PollsApiService;
