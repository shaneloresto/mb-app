'use client'
import movieService from '@/services/movieService';
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import FavoriteItemForm from './components/FavoriteItemFormMUI';
import FavoriteItemList from './components/FavoriteItemList';
import FavoriteItemFilter from './components/FavoriteItemFilter';
import axios from 'axios';
import MoviesContext from '@/context/MoviesContext';
import MovieBoard from './MovieBoard';
import { useRouter } from 'next/navigation';
const MoviesProvider = ({className, children}) => {
  // const [ showForm, setShowForm ] = useState(false);
  // const changePage = () => setShowForm(!showForm);
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  // const id = useRef(0);
  // useEffect( () => {
  //   console.log('useEffect was executed!');
  //   axios.get('http://10.21.74.10:3000/movies')
  //   .then(response => {
  //     const { data } = response;
  //     setMovies(data);
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  //   // (async () => {
  //   //   try {
  //   //       const response = await axios.get('http://10.21.74.10:3000/movies');
  //   //       const { data } = response;
  //   //       setMovies(data);
  //   //       console.log(data);
  //   //     } catch (error) {
  //   //       console.log(error);
  //   //     }
  //   // })();
  // },[]);
  useEffect(() => {
    console.log('useEffect was executed!');
    // movieService.getAll()
    // .then( serverMovies => {
    //   setMovies(serverMovies);
    // })
    // .catch( error => {
    //   console.log('API Error: ' + error);
    // });
    (async () => {
      try {
        const serverMovies = await movieService.getAll();
        setMovies(serverMovies);
      } catch (error) {
        console.log('API Error: ' + error);
      }
    })();
  },[]);
  let randomColor = () => {return `rgb(${Math.random() *256}, ${Math.random() *256}, ${Math.random() *256})`}
  const appFunc = (title, link) => {
    if (movies.some(movie=>movie.itemName.toLowerCase() === title.toLowerCase())) {
        alert(`${title.toLowerCase()} movie is already in list of movies!`);
    } else {
        // const newObj = {
        //     id: id.current,
        //     itemName: title,
        //     itemLink: link,
        //     color: randomColor()
        // }
        // setMovies(movies.concat(newObj));
        // id.current += 1;
        movieService.create({itemName: title, itemLink: link, color: randomColor()})
        .then(newObj=>{setMovies(movies.concat(newObj));
        })
        .then(router.push('/'))
        .catch(e=>{console.log(e);
        });
    }
  }
  const editMovie = (modifiedMovieId, modifiedMovieTitle) => {
    const newMovies = movies.map(movie=>movie.id === modifiedMovieId ? {...movie, itemName: modifiedMovieTitle} : movie);
    // setMovies(newMovies);
    movieService.update(modifiedMovieId, {itemName: modifiedMovieTitle})
    .then(()=>{setMovies(newMovies);
    })
    .catch(e=>{console.log(e);
    });
  }
  const deleteMovie = movieId => {
    // setMovies(movies.filter(movie=>movie.id!==movieId));
    movieService.deleteOne(movieId)
    .then(()=>{setMovies(movies.filter(movie=>movie.id!==movieId));
    })
    .catch(e=>{console.log(e);
    });
  }
  return (
      <MoviesContext.Provider value={{children}}>
        <div className={className}>
          <Header/>
          <Routes>
            <Route path="/" element={<MovieBoard/>} />
            <Route path="/addmovie" element={<FavoriteItemForm appFunc={appFunc}/>} />
          </Routes>
        </div>
      </MoviesContext.Provider>
  );
}
const StyledApp = styled(MoviesProvider)`
    border: 3px solid;
    width: 650px;
    padding: 0 25px 25px 25px;
    margin: 25px 0 0 25px;
    background-color: #A3D4FF;
`;
export default StyledApp;
