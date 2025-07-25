import React from "react"; // Make sure to import React
import "./GlareHover.css";

const GlareHover = ({
  width = "300px", // Default width
  height = "200px", // Default height
  background = "#0a0a0a", // Darker default background
  borderRadius = "10px",
  borderColor = "#222", // Default border color
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.3, // Slightly reduced default opacity for subtlety
  glareAngle = -45, // Angle of the glare swipe (-45 deg creates top-left to bottom-right sweep)
  glareSize = 200, // Size of the glare (e.g., 200% of container dimension)
  animationDuration = 3000, // Duration for one full sweep (in ms). Renamed from transitionDuration.
  className = "",
  style = {},
}) => {
  // Convert hex to rgba for the glare color to apply opacity
  const hex = glareColor.replace("#", "");
  let rgba = glareColor; // Fallback if conversion fails or if it's already rgba/named color

  try {
    if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    }
  } catch (error) {
    console.error("Error converting glareColor to RGBA:", error);
    // Keep original glareColor if conversion fails
    rgba = glareColor;
  }

  // CSS variables for dynamic styling
  const vars = {
    "--gh-width": width,
    "--gh-height": height,
    "--gh-bg": background,
    "--gh-br": borderRadius,
    "--gh-angle": `${glareAngle}deg`,
    "--gh-duration": `${animationDuration}ms`, // Use animationDuration for the sweep
    "--gh-size": `${glareSize}%`,
    "--gh-rgba": rgba,
    "--gh-border": borderColor,
  };

  return (
    <div className={`glare-hover ${className}`} style={{ ...vars, ...style }}>
      {children}
    </div>
  );
};

export default GlareHover;
