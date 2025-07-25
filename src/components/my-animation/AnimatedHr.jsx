import React from "react";
import "./AnimatedHr.css"; // Link to your CSS file

const AnimatedHr = ({
  height = "3px", // Thickness of the HR
  maxWidth = "80%", // Maximum width the HR will grow to
  animationDuration = "4s", // Duration of one complete animation cycle (e.g., 4s)
  gradientColors = [
    // Default multiple colors for the gradient
    "#ff007f", // Pink
    "#00ffb7", // Green
    "#007bff", // Blue
    "#ff007f", // Repeat first color to ensure smooth loop for linear-gradient
  ],
  margin = "40px auto", // Vertical and horizontal margin (auto centers it)
  className = "",
  style = {},
}) => {
  // Join colors for the linear-gradient CSS property
  const gradient = `linear-gradient(90deg, ${gradientColors.join(", ")})`;

  const vars = {
    "--hr-height": height,
    "--hr-max-width": maxWidth,
    "--hr-animation-duration": animationDuration,
    "--hr-gradient": gradient,
    "--hr-margin": margin,
  };

  return (
    <div
      className={`animated-hr ${className}`}
      style={{ ...vars, ...style }}
      role="separator" // Semantic role for accessibility
    ></div>
  );
};

export default AnimatedHr;
