// lib/api.ts

import axios from 'axios';

// Видаляємо стару логіку baseURL
// axios.defaults.baseURL = 'http://localhost:3000/api'

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

// Створюємо інстанс axios
export const nextServer = axios.create({
  baseURL,
  withCredentials: true, // дозволяє axios працювати з cookie
});
