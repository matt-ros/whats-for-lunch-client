import jwtDecode from 'jwt-decode';
import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },

  hasUnexpiredAuthToken() {
    const token = TokenService.getAuthToken();
    if (!token) {
      return false;
    }

    const payload = jwtDecode(token);
    const expiryTime = payload.exp;
    const currentTime = new Date().getTime() / 1000;
    if (expiryTime > currentTime) {
      return true;
    }

    TokenService.clearAuthToken();
    return false;
  },

  saveVotedToken(pollId, timeString) {
    window.localStorage.setItem(`voted-${pollId}`, timeString);
  },

  hasVotedInPoll(pollId, timeString) {
    const votedToken = window.localStorage.getItem(`voted-${pollId}`);
    if (votedToken === timeString) {
      return true;
    }
    return false;
  },
};

export default TokenService;
