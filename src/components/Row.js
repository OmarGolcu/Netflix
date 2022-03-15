
import React, {useEffect, useState} from 'react';
import axios from '../axios';
import '../styles/Row.css';
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLarge}) {
    const [trailerUrl,setTrailerUrl] = useState("");
    const [movies, setMovies] = useState([]);
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const opts = {
        height: "390",
        width: "100%",
        playerVars:{
            autoplay:1,
        },
    }

    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.name || "").then((url) =>{
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error))
        }
    }


    useEffect(()=>{
        
        async function fetchData(){
            const requests = await axios.get(fetchUrl)
            
            setMovies(requests.data.results)
        };
        fetchData();
        
        
    },[]);

    return(
        <div className="row">
             <h2> {title}</h2>
            <div className="row__posters">
                  {/*container -> posters */}
                  {movies.map(movie =>(
                      <img 
                      key={movie.id}
                      onClick={()=>handleClick(movie)}
                      className={`row__poster ${isLarge && "row__posterLarge"}`}
                      src={baseImgUrl+movie.poster_path} 
                      alt={movie.name}/>
                  )
                  )}
            </div>
          
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row ; 