import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sandbox.api.quancy.com.sg/',
  headers: { Authorization: 'Bearer 7631f7fb6b786bdcd704c4f0b786487ab0f0da7457ba757a6fea2c47ba13fbcb' },
});
/* const instance = axios.create({
  baseURL: 'https://5db92ead177b350014ac80d2.mockapi.io/transList/',
}); */

export default instance;
