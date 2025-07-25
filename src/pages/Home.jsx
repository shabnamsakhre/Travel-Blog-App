import { motion } from "motion/react";

import "../assets/styles/home.css";
import BlurText from "../components/react-bits/BlurText";
import bgImage from "../assets/anime-character-traveling.jpg";
import ReadBlog from "../components/ReadBlog";
import Navbar from "../components/Navbar";
import LatestVideos from "../components/LatestVideos";
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";

const Home = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="home-container">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        {/* Hero Image */}
        <div className="bg-image">
          <img src={bgImage} alt="bg-image" />

          <BlurText
            text="Travel Solo, Travel Adventurously"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="header-text"
          />

          <p className="text-2xl">
            Welcome to your one-stop resource for a life-changing journey.
          </p>
        </div>

        <ReadBlog />

        <LatestVideos />

        <Subscribe />

        <Footer />
      </motion.div>
      <Navbar />
    </div>
  );
};

export default Home;
