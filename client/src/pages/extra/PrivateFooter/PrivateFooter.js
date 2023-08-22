import React from "react";
import "./PrivateFooter.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PrivateFooter() {

  let history = useHistory()


  return (
    <>
      <div className="footer">
        <div className="footer_info-first">
          <div className="logo">
           
          </div>
          <p className="text">
            JobPoint is a global sharing platform that you can create posts and view other users posts: <br />
            We are Connecting you with Digital life.
          </p>
        </div>
        <div className="footer_info-second">
<h3>Platform</h3>
<ul>
  <li onClick={() => history.push('/message')}>Messenger</li>
  <li onClick={() => history.push('/discover')}>Discovery</li>
</ul>
        </div>
        <div className="footer_info-third">
        <h3>JobPoint</h3>
<ul>
  <li>About Us</li>
  <li>Press</li>
  <li>Contact Us</li>
  <li>Help Center</li>
  <li>How it Works</li>
  <li>Privacy</li>
  <li>Terms</li>
</ul>
        </div>
        <div className="footer_info-forth">
          <h3>Stay in the loop</h3>
          <p>Join our mailing list to stay in the loop with our newest for News</p>
          <span className="button">
            <input type="email" placeholder="Enter your email address"/>
            <button>Subscibe Now</button>
          </span>
        </div>
      </div>
      <div className="copyright"></div>
      
    </>
  );
}

export default PrivateFooter;