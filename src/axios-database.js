import axios from 'axios'
import config from './config'

const instance = axios.create({
    baseURL: config.firebase.databaseEndpoint
});

export default instance;