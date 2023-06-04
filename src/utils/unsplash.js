/* eslint-disable no-undef */
import { createApi } from 'unsplash-js';

const API = createApi({
  accessKey: process.env.REACT_APP_ACCESSKEY
});

export default API;
