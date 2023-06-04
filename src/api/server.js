import axios from 'axios';

/* 
Creating a HTTP promise based client for sending and receiving requests.
*/
const API = axios.create({
  baseURL: 'http://localhost:8080'
});

export default API;
