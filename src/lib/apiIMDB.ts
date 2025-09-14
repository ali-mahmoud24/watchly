import axios from 'axios';

const apiIMDB = axios.create({
  baseURL: 'https://api.imdbapi.dev',
});

export default apiIMDB;
