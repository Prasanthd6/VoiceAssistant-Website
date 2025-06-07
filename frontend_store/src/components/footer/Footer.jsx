import React from "react";
import "./Footer.css";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram,FaLinkedin,FaFacebook,FaRunning } from "react-icons/fa";
import { FaXTwitter,FaIndianRupeeSign  } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { BsUniversalAccessCircle } from "react-icons/bs";


function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Home repairs</span>
            <span>Painting</span>
            <span>Cleaning</span>
            <span>Moving</span>
            <span>Cooking</span>
            <span>Outdoor help</span>
            <span>Construction</span>
            <span>Electrical</span>
            <span>Gardening</span>
            <span>Pest controll</span>
            <span>Interior design</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Domate</span>
            <span>Buying on Domate</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From Domate</h2>
            <span>Domate Business</span>
            <span>Domate Pro</span>
            <span>Domate Logo Maker</span>
            <span>Domate Guides</span>
            <span>Get Inspired</span>
            <span>Domate Select</span>
            <span>ClearVoice</span>
            <span>Domate Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>domate<FaRunning/></h2>
            
            <span>© Domate International Ltd. 2025</span>
          </div>
          <div className="right">
            <div className="social">
              <FaTiktok size={17}/>
              <FaInstagram size={18}/>
              <FaLinkedin size={18}/>
              <FaFacebook size={18}/>
              <FaXTwitter size={18}/>
              {/* <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" /> */}
            </div>
            <div className="link">
              {/* <img src="/img/language.png" alt="" /> */}
              <TbWorld size={18}/>
              <span>English</span>
            </div>
            <div className="link">
              {/* <img src="/img/coin.png" alt="" /> */}
              <FaIndianRupeeSign size={15}/>
              <span>INR</span>
            </div>
            {/* <img src="/img/accessibility.png" alt="" /> */}
            <BsUniversalAccessCircle size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;