import axios from 'axios';

/* const instance = axios.create({
  baseURL: 'https://sandbox.api.quancy.com.sg/',
  headers: { Authorization: 'Bearer df8cb88c1303a4a662a8b5f6a2c93f0e7c9a90fb28279c1604e3f514e300b1cf' },
}); */
const instance = axios.create({
  baseURL: 'https://5db92ead177b350014ac80d2.mockapi.io/transList/',
});

export default instance;
