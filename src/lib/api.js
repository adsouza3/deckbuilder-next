import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

const csrfTokenTag = document.querySelector('meta[name="csrf-token"]');

if (csrfTokenTag) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfTokenTag.getAttribute('content');
}

const api = axios.create({ baseURL: '' });

api.interceptors.response.use((response) => {
  response.data = camelizeKeys(response.data);
  return response;
});

api.interceptors.request.use((config) => {
  if (config.params) {
    config.params = decamelizeKeys(config.params);
  }

  if (config.data) {
    config.data = decamelizeKeys(config.data);
  }

  return config;
});

export default api;