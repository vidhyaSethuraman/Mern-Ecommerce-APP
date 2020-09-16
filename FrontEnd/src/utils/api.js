import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/",
  responseType: "json",
  headers:
  {
    authorization:localStorage.getItem('jwt')
  }
});

/*
axios.interceptors.request.use(function (config) {
  axios.defaults.headers.authorization= localStorage.getItem('jwt');
  return config;
},function (error) {
  return Promise.reject(error);
});*/


/*
axios.interceptors.request.use(req => {
  console.log("INTERCEPTORRRRRRR");
  // Important: request interceptors **must** return the request.
  return req;
});
*/
/*
axios.interceptors.request.use(function (config) {
  console.log("interceptionnn");
  config.headers.Authorization =  localStorage.getItem('jwt');
  return config;
});*/
