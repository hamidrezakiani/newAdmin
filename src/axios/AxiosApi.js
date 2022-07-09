import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/admin',
  headers: {
   // Authorization: 'Bearer ' + localStorage.getItem('api_token'),
  },
})
instance.interceptors.request.use(request => {
    const token = 'Bearer ' + localStorage.getItem('api_token')
    request.headers.Authorization = token
    return request
}, error => {
    return Promise.reject(error)
});

instance.interceptors.response.use(response => {
    return response
}, error => {
    const errorHandle = new ErrorHandle()
    errorHandle.setError(error.response).handle()
    return Promise.reject(error)
});
export default instance
