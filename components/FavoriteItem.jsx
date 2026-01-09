import styled from 'styled-components';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useContext } from 'react';
import moviesContext from '../moviesContext';
import { Button, ListItem, TextField } from '@mui/material';
const FavoriteItem = ({ id, itemName, itemLink, color }) => {
    const {editMovie, deleteMovie} = useContext(moviesContext);
    const [isEditable, setIsEditable] = useState(false);
    const modifyMovieTitle = modifiedTitle => {
        editMovie(id, modifiedTitle);
        setIsEditable(false);
    }
    return (
        <>
        <ListItem onDoubleClick={ () => setIsEditable(true) } color={color}>
            { isEditable ? <EditMovieTitleForm itemName={itemName} modifyMovieTitle={modifyMovieTitle}/> : itemName}
            :&nbsp;&nbsp;<a href={itemLink}>{itemLink}</a>
            <Button><Trash style={{ marginTop: '8px'}} color='red' onClick={ () => deleteMovie(id) }/></Button>
        </ListItem>
        </>
    );
}
const EditMovieTitleForm = ({itemName,modifyMovieTitle}) => {
    const [modifiedMovieTitle, setModifiedMovieTitle] = useState(itemName);
    const handleFormSubmit = event => {
        event.preventDefault();
        modifyMovieTitle(modifiedMovieTitle);
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <TextField value={modifiedMovieTitle} onChange={event=>setModifiedMovieTitle(event.target.value)}/>
        </form>
    )
}
const StyledListItem = styled.li`
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    font-family: Arial;
    background-color: rgba(255, 255, 255, 0.5);
    list-style: none;
    color: ${props => props.color};
`;
export default FavoriteItem;