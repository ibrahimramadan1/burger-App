import axios from 'axios';
const instance =axios.create({
    baseURL:"https://burger-app-e28d9.firebaseio.com/"
});
export default instance;