import {
  InfoOutlined,
  PlayArrow,
  VolumeMute,
  VolumeUp,
} from "@material-ui/icons";
import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import got from "../../video/got.mp4";
export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1920/api/movies/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setContent(res.data[0]);
        setTimeout(() => {
          setShowVideo(true);
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  const toggleMute = () => {
    setIsMuted(!isMuted);
    const video = document.querySelector(".vd");
    if (video) {
      video.muted = !isMuted;
    }
  };

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}

      {showVideo ? (
        <video src={got} autoPlay={true} loop className="vd" />
      ) : (
        <img src={content.img} alt="" />
      )}

        {showVideo && (
          <button className="mute-button" onClick={toggleMute}>
            {isMuted ? (
              <VolumeMute className="v" />
            ) : (
              <VolumeUp className="v" />
            )}
          </button>
        )}

      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
        <h2 className="limit">+ {content.limit}</h2>
      </div>
    </div>
  );
}
