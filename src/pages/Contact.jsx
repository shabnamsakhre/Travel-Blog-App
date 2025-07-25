import "../assets/styles/contact.css";
import GlitchText from "../components/react-bits/GlitchText";
import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import plane from "../assets/plane.gif";

const Contact = () => {
  return (
    <div className="contact">
      <img src={plane} alt="GIF" className="plane" />

      <div className="main">
        <div className="heading">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="custom-class"
          >
            Contact Me
          </GlitchText>
        </div>

        <h2 className="mail">
          Via email: <span>bemytravelmuse@gmail.com</span>
        </h2>

        <p className="content-1">
          I absolutely love hearing from my readers. You guys are the reason why
          I write this blog! That said, I get numerous emails per day that take
          hours to answer. Please don’t hesitate to reach out, but if your
          question is travel tip or planning-specific, please look at my
          destinations page and/or use the search bar at the top of the
          homepage. You will probably find that your question is answered
          somewhere on the site. If not, please leave a comment on the blog post
          with your specific question – I will reply.
        </p>
        <p className="content-2">
          Dear advertisers: I do not sell links nor accept posts written by
          outside parties
        </p>

        <hr />

        <h2>Work with me</h2>
        <p className="content-1">
          Do you represent a brand or destination that you want to promote on Be
          My Travel Muse? Please look at the guidelines on my Work With Me page,
          and take a look at my media kit for a better idea of how I work with
          brands and for readership numbers.
        </p>

        <hr />

        <h2>If you would like to write for BMTM</h2>
        <p className="content-1">
          Do you have an incredible, truly unique story to tell about traveling
          alone? Have you overcome an obstacle that would keep most people at
          home? BMTM sometimes shares incredible stories of travelers and their
          journeys. Please send a concise pitch with your idea if you’d like to
          be featured on the site.
        </p>
      </div>

      <Subscribe />
      <Footer />

      <Navbar />
    </div>
  );
};

export default Contact;
