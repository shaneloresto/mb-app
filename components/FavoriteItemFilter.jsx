import styled from 'styled-components';
const FavoriteItemFilter = ({searchMovie, handleSearchMovieChange}) => (
    <StyledDiv style={{ margin: '15px'}}>Show only movies containing:&nbsp;
        <input value={searchMovie} onChange={handleSearchMovieChange} />
    </StyledDiv>
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