import axios from 'axios';

/* const instance = axios.create({
  baseURL: 'https://sandbox.api.quancy.com.sg/',
  headers: { Authorization: 'Bearer 31e3e7d3852ee5ae65413d99fbd4e8432aa493058d7c72701edaddbf05ad99a5' },
}); */
const instance = axios.create({
  baseURL: 'https://5db92ead177b350014ac80d2.mockapi.io/transList/',
});

export default instance;
