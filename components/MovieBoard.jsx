import { useState } from 'react';
import FavoriteItemFilter from "./components/FavoriteItemFilter";
import FavoriteItemList from "./components/FavoriteItemList";
import Box from '@mui/material/Box';
import { Link } from 'react-router';
const MovieBoard = ({changePage}) => {
    const [searchMovie, setSearchMovie] = useState('');
    return (
        <>
            <FavoriteItemFilter searchMovie={searchMovie} handleSearchMovieChange={event => setSearchMovie(event.target.value)}/>
                <Box sx={{ ml: 2, mt: 2, width: 265, display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/addmovie">Add a Movie</Link>
                </Box>
            <FavoriteItemList searchMovie={searchMovie}/>
        </>
    );
}
export default MovieBoard;