import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sandbox.api.quancy.com.sg/',
  headers: { Authorization: 'Bearer 37a3ae4d206fbb46bd717d16a1a67995944231f185cdc7e988c54d645a8ef308' },
});
/* const instance = axios.create({
  baseURL: 'https://5db92ead177b350014ac80d2.mockapi.io/transList/',
}); */

export default instance;
