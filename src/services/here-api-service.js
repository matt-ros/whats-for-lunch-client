import config from '../config';

const HereApiService = {
  geoSearch(query) {
    const params = {
      apiKey: config.API_KEY,
      q: query,
      qq: 'country=usa',
    };

    return fetch(`${config.GEOCODE_BASE_URL}?${formatQueryParams(params)}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  restaurantSearch(lat, long, radius = 1609) {
    const params = {
      apiKey: config.API_KEY,
      at: `${lat},${long}`,
      in: `circle:${lat},${long};r=${radius}`,
      limit: 100,
      categories: '100-1000',
    };

    return fetch(`${config.SEARCH_BASE_URL}?${formatQueryParams(params)}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  }
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

export default HereApiService;
