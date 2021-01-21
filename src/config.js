module.exports = {
  TOKEN_KEY: 'whatsforlunch-client-auth-token',
  GEOCODE_BASE_URL: 'https://geocode.search.hereapi.com/v1/geocode',
  SEARCH_BASE_URL: 'https://browse.search.hereapi.com/v1/browse',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.121:8000/api',
  API_KEY: process.env.REACT_APP_API_KEY,
};
