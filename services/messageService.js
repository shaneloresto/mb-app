import axios from 'axios';

const getAll = () => 
  axios.get(process.env.NEXT_PUBLIC_SERVICE_URL).then(response => response.data);

const create = ( object, reqConfig ) =>
  axios.post(process.env.NEXT_PUBLIC_SERVICE_URL, object, { headers: reqConfig }).then( response => response.data );

const update = ( id, object, reqConfig ) =>
  axios.patch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/${id}`, object, { headers: reqConfig }).then(response => response.data);

const deleteOne = ( id, reqConfig ) =>
  axios.delete(`${process.env.NEXT_PUBLIC_SERVICE_URL}/${id}`, { headers: reqConfig }).then(response => response.data);

const login = object =>
  axios.post(process.env.NEXT_PUBLIC_LOGIN_URL, object).then( response => response.data );

const signup = object => {
  const signupUrl = process.env.NEXT_PUBLIC_SIGNUP_URL || 'http://127.0.0.1:3004/v1/users';
  return axios.post(signupUrl, object).then( response => response.data );
};

const messageService = { getAll, create, update, deleteOne, login, signup };
export default messageService;