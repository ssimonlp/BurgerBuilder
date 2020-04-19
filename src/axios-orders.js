import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b1cc2.firebaseio.com/'
});

export default instance;
