import axios from 'axios';

const instance= axios.create({
    baseURL:'https://burger-app-ead6c.firebaseio.com/'
});

export default instance;