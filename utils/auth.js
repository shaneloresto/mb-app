const setToken = token => sessionStorage.setItem('token', token);
const auth = { setToken };
const tokenExists = () => sessionStorage.getItem('token') ? true : false;
export default auth;