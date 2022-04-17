import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
})

instance.defaults.xsrfCookieName = 'csrftoken';
instance.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export default instance;