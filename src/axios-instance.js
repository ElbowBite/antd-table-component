import axios from 'axios';

/* const instance = axios.create({
  baseURL: 'https://sandbox.api.quancy.com.sg/',
  headers: { Authorization: 'Bearer e52a6dc1d46c83a0dbbaf3ad86f0861ffbfccf5d83da4e3c7c5ed3ffa3890ae3' },
}); */
const instance = axios.create({
  baseURL: 'https://5db92ead177b350014ac80d2.mockapi.io/transList/',
});

export default instance;
