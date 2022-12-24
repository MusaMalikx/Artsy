import axios from 'axios';
// https://uresumes-proxy.herokuapp.com/http://umresumes-api.vercel.app/api/v1
//https://umresumes-api.vercel.app/api/v1
const API = axios.create({
  baseURL: 'http://localhost:8080'
});

export default API;
