import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";
import"./navbar.css"
import {Link, useNavigate} from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleQuestion, faGear } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handelLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/login");
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/home" className="link">
          <span>Home</span>
          </Link>
          <Link to="/series" className="link">
          <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
          <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
          <span>Browse by Languages</span>
        </div>

        <div className="box">
          <input type="text" placeholder="Search" />
          <Search className="iconSearch" />
        </div>

        <div className="right">
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
            {/* <span>
              <FontAwesomeIcon icon={faCircleQuestion} style={{color: "#999fa8",}} className="opicons" />
            Help Center
            </span>
              <span>
                <FontAwesomeIcon icon={faGear}  style={{color: "#999fa8",}}  className="opicons" />
                Settings
                </span> */}
              <span onClick={handelLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
