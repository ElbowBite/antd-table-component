import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sandbox.api.quancy.com.sg/',
  headers: { Authorization: 'Bearer fdac36b64ab6a47ae640886e4381227dde6872da8c594b1ec55517ede6008b40' },
});
/* const instance = axios.create({
  baseURL: 'https://5db92ead177b350014ac80d2.mockapi.io/transList/',
}); */

export default instance;
