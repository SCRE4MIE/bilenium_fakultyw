import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
})

export default instance;