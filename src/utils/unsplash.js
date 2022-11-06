import {createApi} from "unsplash-js"

const API = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: process.env.REACT_APP_ACCESSKEY//"AVJFYUIdZksA6ohMJ4DVjGb6i-olvvisJzs4EoDA-ro"
  });


export default API