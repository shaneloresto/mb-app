import styled from 'styled-components';
import { Box, TextField, Typography } from '@mui/material';
const FavoriteItemFilter = ({searchMovie, handleSearchMovieChange}) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ ml: 3 }}>
            <Typography>Show only</Typography>
            <Typography>messages containing:</Typography>
        </Box>
        <TextField sx={{ ml: 1 }} value={searchMovie} onChange={handleSearchMovieChange} />
    </Box>
);
const StyledDiv = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 15px;
    border: 1px solid black;
    border-radius: 5px;
    font-weight: bold;
    font-family: Arial;
`;
export default FavoriteItemFilter;