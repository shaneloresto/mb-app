import FavoriteItem from './FavoriteItem';
import { useContext } from 'react';
import moviesContext from '../moviesContext';
import List from '@mui/material/List';
const FavoriteItemList = ({searchMovie}) => {
    const { movies } = useContext(moviesContext);
    const moviesToShow = searchMovie
        ? movies.filter((movie) => movie.itemName.toLowerCase().includes(searchMovie))
        : movies
    return (
        <>
        <List sx={{ ml: 1 }}>{ moviesToShow.map(movie=><FavoriteItem key={movie.id} id={movie.id} itemName={movie.itemName} itemLink={movie.itemLink} color={movie.color}/>) }</List>
        </>
    );
}
export default FavoriteItemList;