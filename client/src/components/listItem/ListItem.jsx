import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {Link } from "react-router-dom";

export default function ListItem({ index , item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(()=>{
   const getmMovie = async ()=>{
    try{
        const res = await axios.get("http://localhost:1920/api/movies/"+item ,
        {
          headers: {
            token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDI0Yzg3ZjU3ZTcxNDA3ZTg5MmI3YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTE3MTg2MzgsImV4cCI6MTY5MTg5MTQzOH0.8QJtJgwcmpu2scZ1VbXyY57CVs-DmpoJtekykZBXsH4",
          },
        })
        setMovie(res.data)
    }catch(err){
      console.log(err)
    }
   }
   getmMovie()
  },[item])
 
  return (
    <Link to={{pathname :'/watch' , movie:movie}}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.img}
        alt="img"
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration} min</span>
              <span>{movie.year}</span>
              <span className="limit">+{movie.limit}</span>
              
            </div>
            <div className="desc">best Movie Ever To watch...</div>
            <div className="genre"><h3>{movie.genre}</h3></div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}
