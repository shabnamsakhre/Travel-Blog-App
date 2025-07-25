import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import "./RollingGallery.css";

// Updated data structure for YouTube videos
const VIDEOS = [
  { videoId: "8Jkmkgi5V3c", title: "Best SOLO Trips in the Western US" },
  { videoId: "oj2UBcXQHe0", title: "California Bucket List (Local's Guide)" },
  { videoId: "3lBE-2NTwLE", title: "10 Best Places for INTROVERTS" },
  { videoId: "EVicho9Q_O8", title: "Best Road Trips in the Western US" },
  {
    videoId: "dGwFVHgwT3E",
    title: "Is this Bali’s Best Hotel? Capella Ubud HONEST Review",
  },
  { videoId: "EHqzt_bouwE", title: "The HAWAII of EUROPE (Flores Island)" },
  {
    videoId: "AKQLRC35UlE",
    title: "Surprisingly Awesome Places to Travel ALONE",
  },
  { videoId: "4IlQ7g1E2Jo", title: "DO NOT Travel to These Places ALONE" },
  {
    videoId: "rIial9oSuWQ",
    title: "The BEST Countries for WOMEN to Travel to",
  },
  {
    videoId: "wTnBXASDZpk",
    title: "This is SOUTHERN IDAHO! Hidden Waterfalls and Crystal Clear Lakes",
  },
];

// Helper function to get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId) => {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`; // mqdefault.jpg for medium quality
};

// Video Modal Component
const VideoModal = ({ videoId, title, onClose }) => {
  if (!videoId) return null;

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close-button" onClick={onClose}>
          &times;
        </button>
        {title && <h3>{title}</h3>}
        <div className="video-modal-iframe-container">
          <iframe
            src={youtubeEmbedUrl}
            title={title || "YouTube video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [], // This prop now expects objects with videoId and title
}) => {
  // Use the prop 'images' directly if provided, otherwise fallback to VIDEOS
  const currentItems = images.length > 0 ? images : VIDEOS;

  const galleryContentRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [modalVideoId, setModalVideoId] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // Derive cylinderWidth, faceWidth, and radius dynamically
  const faceCount = currentItems.length;
  const cylinderWidth = containerWidth * 2.5; // Adjust this multiplier for desired curvature
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 0.1,
        ease: "easeOut",
      },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  useEffect(() => {
    if (autoplay) {
      const stepRotation = -(360 / faceCount);

      const animateStep = () => {
        controls.start({
          rotateY: rotation.get() + stepRotation,
          transition: { duration: 10, ease: "linear" },
        });
        rotation.set(rotation.get() + stepRotation);
      };

      autoplayRef.current = setInterval(animateStep, 10000);

      return () => clearInterval(autoplayRef.current);
    }
  }, [autoplay, rotation, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => {
      if (galleryContentRef.current) {
        setContainerWidth(galleryContentRef.current.offsetWidth);
      }
    };

    handleResize(); // Initial width on mount

    const observer = new ResizeObserver(handleResize);
    if (galleryContentRef.current) {
      observer.observe(galleryContentRef.current);
    }

    return () => {
      if (galleryContentRef.current) {
        observer.unobserve(galleryContentRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const stepRotation = -(360 / faceCount);

      controls.start({
        rotateY: rotation.get() + stepRotation,
        transition: { duration: 10, ease: "linear" },
      });
      rotation.set(rotation.get() + stepRotation);

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() + stepRotation,
          transition: { duration: 10, ease: "linear" },
        });
        rotation.set(rotation.get() + stepRotation);
      }, 10000);
    }
  };

  const dragFactor = 0.05;

  // Function to handle click on a video item
  const handleVideoClick = (videoId, title) => {
    setModalVideoId(videoId);
    setModalTitle(title);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalVideoId("");
    setModalTitle("");
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left"></div>
      <div className="gallery-gradient gallery-gradient-right"></div>
      <div className="gallery-content" ref={galleryContentRef}>
        <motion.div
          drag="x"
          className="gallery-track"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
            left: `calc(50% - ${cylinderWidth / 2}px)`,
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {currentItems.map((item, i) => (
            <div
              key={item.videoId || i} // Use videoId as key for stability
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleVideoClick(item.videoId, item.title)}
            >
              {/* Thumbnail wrapper */}
              <div
                className="gallery-thumbnail-wrapper"
                style={{
                  backgroundImage: `url(${getYouTubeThumbnail(item.videoId)})`,
                }}
              ></div>
              {/* Title below the thumbnail */}
              <h5>{item.title}</h5>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <VideoModal
          videoId={modalVideoId}
          title={modalTitle}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default RollingGallery;
