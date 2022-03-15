import React ,{useState, useEffect} from 'react'
import axios from '../axios'
import requests from '../requests'
import '../styles/Banner.css'

function Banner() {
    const [movie,setMovie] = useState([]);
    const baseImgUrl = "https://image.tmdb.org/t/p/original"
    function truncate(str,n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
         
    }

    useEffect(()=>{
        
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1)
                ]);
        };
        fetchData();
        console.log(movie.original_name);
        
    },[]);
    
  return (
    <header className="banner" style={{
        backgroundSize:"cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition:"center center"
    }}>
        <div className="banner__contents">
            <h1 className="banner__title">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="baner__btn-grp">
                <button className="banner__btn">Play</button>
                <button className="banner__btn">My List</button>
            </div>
            <h2 className="banner__description">
                {truncate(movie?.overview,150)}
            </h2>
         </div>
       
         <div className="banner__fadeBottom"></div>
    </header>
    
    
  )
}

export default Banner;