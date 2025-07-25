// import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { gsap } from "gsap";

// import "./Masonry.css"; // UNCOMMENTED THIS IMPORT

// const useMedia = (queries, values, defaultValue) => {
//   const get = () =>
//     values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

//   const [value, setValue] = useState(get);

//   useEffect(() => {
//     const handler = () => setValue(get);
//     queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
//     return () =>
//       queries.forEach((q) =>
//         matchMedia(q).removeEventListener("change", handler)
//       );
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [JSON.stringify(queries)]);

//   return value;
// };

// const useMeasure = () => {
//   const ref = useRef(null);
//   const [size, setSize] = useState({ width: 0, height: 0 });

//   useLayoutEffect(() => {
//     if (!ref.current) return;
//     const ro = new ResizeObserver(([entry]) => {
//       const { width, height } = entry.contentRect;
//       setSize({ width, height });
//     });
//     ro.observe(ref.current);
//     // Set initial size immediately
//     const initialRect = ref.current.getBoundingClientRect();
//     setSize({ width: initialRect.width, height: initialRect.height });

//     return () => ro.disconnect();
//   }, []);

//   return [ref, size];
// };

// const preloadImages = async (urls) => {
//   await Promise.all(
//     urls.map(
//       (src) =>
//         new Promise((resolve) => {
//           const img = new Image();
//           img.src = src;
//           img.onload = img.onerror = () => resolve();
//         })
//     )
//   );
// };

// const Masonry = ({
//   items, // Expected: [{ id: string, img: string, height: number, url: string }]
//   ease = "power3.out",
//   duration = 0.6,
//   stagger = 0.05,
//   animateFrom = "bottom", // "top", "bottom", "left", "right", "center", "random"
//   scaleOnHover = true,
//   hoverScale = 0.95,
//   blurToFocus = true,
//   colorShiftOnHover = false,
//   animationOffset = "20%", // Percentage of viewport to consider as intersection threshold
// }) => {
//   const navigate = useNavigate();

//   const columns = useMedia(
//     [
//       "(min-width:1500px)",
//       "(min-width:1000px)",
//       "(min-width:600px)",
//       "(min-width:400px)",
//     ],
//     [5, 4, 3, 2],
//     1
//   );

//   const [containerRef, { width }] = useMeasure();
//   const [imagesReady, setImagesReady] = useState(false);

//   // State to track which items have been animated (to prevent re-animating on scroll back up)
//   const animatedItems = useRef(new Set());

//   // State to track intersection status of each item
//   const [intersectingItems, setIntersectingItems] = useState({});

//   // Memoize getInitialPosition to avoid re-creation on every render
//   const getInitialPosition = useMemo(
//     () => (item) => {
//       const containerRect = containerRef.current?.getBoundingClientRect();

//       let direction = animateFrom;

//       if (animateFrom === "random") {
//         const directions = ["top", "bottom", "left", "right"];
//         direction = directions[Math.floor(Math.random() * directions.length)];
//       }

//       let initialX = item.x;
//       let initialY = item.y;

//       switch (direction) {
//         case "top":
//           initialY = -item.h;
//           break;
//         case "bottom":
//           initialY = (containerRect?.height || window.innerHeight) + item.h;
//           break;
//         case "left":
//           initialX = -item.w;
//           break;
//         case "right":
//           initialX = (containerRect?.width || window.innerWidth) + item.w;
//           break;
//         case "center":
//           initialX = (containerRect?.width || 0) / 2 - item.w / 2;
//           initialY = (containerRect?.height || 0) / 2 - item.h / 2;
//           break;
//         default:
//           initialY = item.y + 100;
//           break;
//       }
//       return { x: initialX, y: initialY };
//     },
//     [animateFrom, containerRef]
//   );

//   useEffect(() => {
//     const imageUrls = items.map((i) => i.img);
//     preloadImages(imageUrls).then(() => setImagesReady(true));
//   }, [items]);

//   const grid = useMemo(() => {
//     if (!width || items.length === 0) return [];

//     const colHeights = new Array(columns).fill(0);
//     const columnWidth = width / columns;

//     const calculatedGrid = items.map((child) => {
//       const col = colHeights.indexOf(Math.min(...colHeights));
//       const x = columnWidth * col;
//       const height = child.height / 2; // Assuming child.height is relative to target width or a predefined aspect ratio
//       const y = colHeights[col];

//       colHeights[col] += height;

//       return { ...child, x, y, w: columnWidth, h: height };
//     });

//     if (containerRef.current) {
//       gsap.to(containerRef.current, {
//         height: Math.max(...colHeights),
//         duration: duration,
//         ease: ease,
//         overwrite: "auto",
//       });
//     }

//     return calculatedGrid;
//   }, [columns, items, width, containerRef, duration, ease]);

//   // Intersection Observer setup
//   useEffect(() => {
//     if (!imagesReady || grid.length === 0 || !containerRef.current) return;

//     // Root margin creates a "buffer zone" around the viewport
//     // When an element enters this zone, it's considered intersecting
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           setIntersectingItems((prev) => ({
//             ...prev,
//             [entry.target.dataset.key]: entry.isIntersecting,
//           }));
//         });
//       },
//       {
//         root: null, // viewport as the root
//         rootMargin: `0px 0px ${animationOffset} 0px`, // Adjust margin for early trigger
//         threshold: 0.1, // Trigger when 10% of the element is visible
//       }
//     );

//     // Observe each item after it's rendered
//     grid.forEach((item) => {
//       const element = document.querySelector(`[data-key="${item.id}"]`);
//       if (element) {
//         observer.observe(element);
//       }
//     });

//     return () => {
//       // Disconnect observer on component unmount
//       observer.disconnect();
//     };
//   }, [grid, imagesReady, animationOffset, containerRef]); // Re-run if grid or imagesReady changes

//   // Animation logic now depends on intersectingItems state
//   useLayoutEffect(() => {
//     if (!imagesReady || grid.length === 0) return;

//     grid.forEach((item, index) => {
//       const selector = `[data-key="${item.id}"]`;
//       const element = document.querySelector(selector); // Get the actual DOM element
//       if (!element) return; // Ensure element exists

//       const isItemIntersecting = intersectingItems[item.id];
//       const hasItemAnimated = animatedItems.current.has(item.id);

//       // Only animate if intersecting and not yet animated
//       if (isItemIntersecting && !hasItemAnimated) {
//         const initialPos = getInitialPosition(item);
//         const initialState = {
//           opacity: 0,
//           x: initialPos.x,
//           y: initialPos.y,
//           width: item.w,
//           height: item.h,
//           ...(blurToFocus && { filter: "blur(10px)" }),
//           // Ensure initial state is applied immediately before animation
//           // This prevents a flash of final state before GSAP takes over.
//           immediateRender: true,
//         };

//         gsap.fromTo(element, initialState, {
//           opacity: 1,
//           x: item.x,
//           y: item.y,
//           width: item.w,
//           height: item.h,
//           ...(blurToFocus && { filter: "blur(0px)" }),
//           duration: 0.8,
//           ease: "power3.out",
//           delay: index * stagger,
//           onComplete: () => {
//             animatedItems.current.add(item.id); // Mark as animated
//           },
//         });
//       } else if (!isItemIntersecting && hasItemAnimated) {
//         // Optional: Reset state if it scrolls out of view AND was animated.
//         // This makes it re-animate if scrolled into view again.
//         // If you want a one-time animation, remove this else if block.
//         // For a one-time animation, remove `animatedItems.current.delete(item.id)`
//         // and keep `animatedItems.current.add(item.id)` only.
//         // Currently, we want it to animate *only once* when it first comes into view.
//         // So no action needed here.
//       } else if (hasItemAnimated) {
//         // If it has animated and is not currently intersecting, keep its final state
//         // or just ensure it's in its final position if it scrolled back into view
//         // but was already animated.
//         // This handles cases where grid layout changes after initial animation.
//         gsap.to(element, {
//           x: item.x,
//           y: item.y,
//           width: item.w,
//           height: item.h,
//           duration: duration,
//           ease: ease,
//           overwrite: "auto",
//         });
//       }
//     });
//   }, [
//     grid,
//     imagesReady,
//     stagger,
//     blurToFocus,
//     getInitialPosition,
//     intersectingItems, // Depend on intersection state
//     duration,
//     ease,
//   ]);

//   const handleMouseEnter = (e, item) => {
//     const element = e.currentTarget;
//     const selector = `[data-key="${item.id}"]`;

//     if (scaleOnHover) {
//       gsap.to(selector, {
//         scale: hoverScale,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     }

//     if (colorShiftOnHover) {
//       const overlay = element.querySelector(".color-overlay");
//       if (overlay) {
//         gsap.to(overlay, {
//           opacity: 0.3,
//           duration: 0.3,
//         });
//       }
//     }
//   };

//   const handleMouseLeave = (e, item) => {
//     const element = e.currentTarget;
//     const selector = `[data-key="${item.id}"]`;

//     if (scaleOnHover) {
//       gsap.to(selector, {
//         scale: 1,
//         duration: 0.3,
//         ease: "power3.out",
//       });
//     }

//     if (colorShiftOnHover) {
//       const overlay = element.querySelector(".color-overlay");
//       if (overlay) {
//         gsap.to(overlay, {
//           opacity: 0,
//           duration: 0.3,
//         });
//       }
//     }
//   };

//   return (
//     <div ref={containerRef} className="list">
//       {grid.map((item) => {
//         return (
//           <div
//             key={item.id}
//             data-key={item.id}
//             className="item-wrapper"
//             // onClick={() => window.open(item.url, "_blank", "noopener")}
//             onClick={() => navigate(`/blog/${item.id}`)}
//             onMouseEnter={(e) => handleMouseEnter(e, item)}
//             onMouseLeave={(e) => handleMouseLeave(e, item)}
//             // Initially hide the items if not intersecting or not animated yet
//             // This prevents a flicker before GSAP animates them
//             style={{ opacity: animatedItems.current.has(item.id) ? 1 : 0 }}
//           >
//             <div
//               className="item-img"
//               style={{ backgroundImage: `url(${item.img})` }}
//             >
//               {colorShiftOnHover && (
//                 <div
//                   className="color-overlay"
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     background:
//                       "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
//                     opacity: 0,
//                     pointerEvents: "none",
//                     borderRadius: "8px",
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Masonry;

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

import "./Masonry.css";

// --- (useMedia, useMeasure, preloadImages helper functions remain unchanged) ---
const useMedia = (queries, values, defaultValue) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queries)]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    // Set initial size immediately
    const initialRect = ref.current.getBoundingClientRect();
    setSize({ width: initialRect.width, height: initialRect.height });

    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};
// --- (End of helper functions) ---

const Masonry = ({
  items, // Expected: [{ id: string, img: string, height: number, url: string, title: string }]
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom", // "top", "bottom", "left", "right", "center", "random"
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false, // Keep this separate from new overlay
  animationOffset = "20%",
}) => {
  const navigate = useNavigate();

  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const animatedItems = useRef(new Set());
  const [intersectingItems, setIntersectingItems] = useState({});

  const getInitialPosition = useMemo(
    () => (item) => {
      const containerRect = containerRef.current?.getBoundingClientRect();

      let direction = animateFrom;

      if (animateFrom === "random") {
        const directions = ["top", "bottom", "left", "right"];
        direction = directions[Math.floor(Math.random() * directions.length)];
      }

      let initialX = item.x;
      let initialY = item.y;

      switch (direction) {
        case "top":
          initialY = -item.h;
          break;
        case "bottom":
          initialY = (containerRect?.height || window.innerHeight) + item.h;
          break;
        case "left":
          initialX = -item.w;
          break;
        case "right":
          initialX = (containerRect?.width || window.innerWidth) + item.w;
          break;
        case "center":
          initialX = (containerRect?.width || 0) / 2 - item.w / 2;
          initialY = (containerRect?.height || 0) / 2 - item.h / 2;
          break;
        default:
          initialY = item.y + 100;
          break;
      }
      return { x: initialX, y: initialY };
    },
    [animateFrom, containerRef]
  );

  useEffect(() => {
    const imageUrls = items.map((i) => i.img);
    preloadImages(imageUrls).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width || items.length === 0) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const calculatedGrid = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        height: Math.max(...colHeights),
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }

    return calculatedGrid;
  }, [columns, items, width, containerRef, duration, ease]);

  useEffect(() => {
    if (!imagesReady || grid.length === 0 || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIntersectingItems((prev) => ({
            ...prev,
            [entry.target.dataset.key]: entry.isIntersecting,
          }));
        });
      },
      {
        root: null,
        rootMargin: `0px 0px ${animationOffset} 0px`,
        threshold: 0.1,
      }
    );

    grid.forEach((item) => {
      const element = document.querySelector(`[data-key="${item.id}"]`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [grid, imagesReady, animationOffset, containerRef]);

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const element = document.querySelector(selector);
      if (!element) return;

      const isItemIntersecting = intersectingItems[item.id];
      const hasItemAnimated = animatedItems.current.has(item.id);

      if (isItemIntersecting && !hasItemAnimated) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0, // GSAP will control initial opacity
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
          immediateRender: true,
        };

        gsap.fromTo(element, initialState, {
          opacity: 1, // GSAP animates to full opacity
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
          onComplete: () => {
            animatedItems.current.add(item.id);
          },
        });
      } else if (hasItemAnimated) {
        // If it has animated, ensure it stays in its final position
        gsap.to(element, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          opacity: 1, // Ensure it remains visible if already animated
          duration: duration,
          ease: ease,
          overwrite: "auto",
        });
      }
      // If not intersecting and not animated, ensure it's hidden (GSAP's immediateRender on initial state handles this)
      // This 'else if' block for `!isItemIntersecting` and `hasItemAnimated` is removed
      // because we want the animation to happen only once on intersection.
      // If it scrolls out, we don't want it to re-hide itself using GSAP unless you specifically want to re-animate on scroll back.
      // The `animatedItems` ref correctly prevents re-animation.
    });
  }, [
    grid,
    imagesReady,
    stagger,
    blurToFocus,
    getInitialPosition,
    intersectingItems,
    duration,
    ease,
  ]);

  const handleMouseEnter = (e, item) => {
    const element = e.currentTarget;
    const itemSelector = `[data-key="${item.id}"]`;
    const overlaySelector = element.querySelector(".item-overlay");

    if (scaleOnHover) {
      gsap.to(itemSelector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (overlaySelector) {
      gsap.to(overlaySelector, {
        opacity: 1,
        visibility: "visible",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const colorOverlay = element.querySelector(".color-overlay");
      if (colorOverlay) {
        gsap.to(colorOverlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e, item) => {
    const element = e.currentTarget;
    const itemSelector = `[data-key="${item.id}"]`;
    const overlaySelector = element.querySelector(".item-overlay");

    if (scaleOnHover) {
      gsap.to(itemSelector, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    if (overlaySelector) {
      gsap.to(overlaySelector, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.3,
        ease: "power3.out",
      });
    }

    if (colorShiftOnHover) {
      const colorOverlay = element.querySelector(".color-overlay");
      if (colorOverlay) {
        gsap.to(colorOverlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="list">
      {grid.map((item) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={() => navigate(`/blog/${item.id}`)}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
            // REMOVED THIS PART: style={{ opacity: animatedItems.current.has(item.id) ? 1 : 0 }}
            // GSAP's fromTo will handle initial opacity: 0 and animation to 1
          >
            <div
              className="item-img"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {/* Overlay for title */}
              <div className="item-overlay">
                <h3>{item.title}</h3>
              </div>

              {/* Original colorShiftOnHover overlay (if needed) */}
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                    opacity: 0,
                    pointerEvents: "none",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
