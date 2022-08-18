import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://tsouq-backend.herokuapp.com',
    withCredentials: true
    // baseURL: 'http://localhost:4000'
})

export default instance