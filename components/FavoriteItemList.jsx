import FavoriteItem from './FavoriteItem';
const FavoriteItemList = ({movies, searchMovie, editMovie, deleteMovie}) => {
    const moviesToShow = searchMovie
        ? movies.filter((movie) => movie.itemName.toLowerCase().includes(searchMovie))
        : movies
    return (
        <>
        <ol>{ moviesToShow.map(movie=><FavoriteItem key={movie.id} id={movie.id} itemName={movie.itemName} itemLink={movie.itemLink} color={movie.color} editMovie={editMovie} deleteMovie={deleteMovie} />) }</ol>
        </>
    );
}
export default FavoriteItemList;