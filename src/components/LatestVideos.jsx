import GlitchText from "./react-bits/GlitchText";
import "../assets/styles/latest-video.css";
import RollingGallery from "./react-bits/RollingGallery";

const LatestVideos = () => {
  return (
    <div className="latest-video">
      <GlitchText
        speed={1}
        enableShadows={true}
        enableOnHover={true}
        className="custom-class"
      >
        Latest Videos
      </GlitchText>

      <RollingGallery autoplay={true} pauseOnHover={true} />
    </div>
  );
};

export default LatestVideos;
