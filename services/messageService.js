import axios from 'axios';


const getAll = () => 
  axios.get(process.env.NEXT_PUBLIC_SERVICE_URL).then(response => response.data);


const create = object =>
  axios.post(process.env.NEXT_PUBLIC_SERVICE_URL, object).then(response => response.data);


const update = ( id, object ) =>
  axios.patch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/${id}`, object).then(response => response.data);


const deleteOne = id =>
  axios.delete(`${process.env.NEXT_PUBLIC_SERVICE_URL}/${id}`).then(response => response.data);


const messageService = { getAll, create, update, deleteOne };
export default messageService;