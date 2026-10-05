import { jwtDecode } from 'jwt-decode';
const setToken = token => sessionStorage.setItem('token', token);
const tokenExists = () => sessionStorage.getItem('token') ? true : false;
const hasTokenExpired = () => {
    const token = sessionStorage.getItem('token')
    // if token is undefined, there was no token
    // in session storage, return true
    if (!token) return true;
    // otherwise, determine if it has expired
    const decodedToken = jwtDecode(token);
    // Some useful debug statements:
    console.log('token\'s expiry: ' + decodedToken.exp * 1000);
    console.log('Date now: ' + Date.now());
    console.log(`Time left token is valid: ${(decodedToken.exp * 1000 - Date.now())/1000} seconds`);
    if ( Date.now() > decodedToken.exp * 1000 ) {
        sessionStorage.removeItem('token');
        return true;
    }
    return false;
}
// returns the username of the logged-in User
// or 'none' if not logged in
const getLoggedInUsername = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return 'none';
    return jwtDecode(token).username;
}
const auth = { setToken, tokenExists, hasTokenExpired, getLoggedInUsername };
export default auth;