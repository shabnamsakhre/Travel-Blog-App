import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../assets/styles/splash-screen.css";
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoom(true); // Start zoom after 1 second
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-container">
      <DotLottieReact
        src="https://lottie.host/ae072db0-7d7a-400a-943e-f0a2f73a4079/MPFqFPYuMi.lottie"
        loop
        autoplay
        className={`splash-image ${zoom ? "zoom" : ""}`}
      />
    </div>
  );
};

export default SplashScreen;
