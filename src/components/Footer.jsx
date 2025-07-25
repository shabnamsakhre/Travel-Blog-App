import "../assets/styles/footer.css";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import pinterest from "../assets/icons/pinterest.png";
import twitter from "../assets/icons/twitter.png";
import youtube from "../assets/icons/youtube.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="main">
        <div className="logo">
          <img
            src="https://www.bemytravelmuse.com/wp-content/uploads/2017/11/bemytravelmuselogo.png"
            alt="logo"
          />
        </div>

        <div className="links">
          <h1>Stay Connected</h1>

          <div className="icons">
            <a href="https://www.facebook.com/BeMyTravelMuse/" target="_blank">
              <img src={facebook} alt="facebook" />
            </a>

            <a href="https://x.com/bemytravelmuse" target="_blank">
              <img src={twitter} alt="twitter" />
            </a>

            <a href="https://www.instagram.com/bemytravelmuse/" target="_blank">
              <img src={instagram} alt="instagram" />
            </a>

            <a href="https://www.pinterest.com/kristinaddis/" target="_blank">
              <img src={pinterest} alt="pinterest" />
            </a>

            <a
              href="https://www.youtube.com/channel/UCVdvbdhaXo01c1G4mNp1RsQ"
              target="_blank"
            >
              <img src={youtube} alt="youtube" />
            </a>
          </div>
        </div>
      </div>

      <p>© 2025 · Be My Travel Muse. All Rights Reserved</p>
    </div>
  );
};

export default Footer;
