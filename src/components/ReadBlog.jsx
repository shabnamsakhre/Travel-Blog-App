// import GlitchText from "./react-bits/GlitchText";
// import "../assets/styles/read-blog.css";
// import Masonry from "./react-bits/Masonry";

// const ReadBlog = () => {
//   const items = [
//     {
//       id: "0",
//       img: "https://picsum.photos/id/1015/600/900?grayscale",
//       url: "https://example.com/one",
//       height: 400,
//     },
//     {
//       id: "1",
//       img: "https://picsum.photos/id/1011/600/750?grayscale",
//       url: "https://example.com/two",
//       height: 250,
//     },
//     {
//       id: "2",
//       img: "https://picsum.photos/id/1020/600/800?grayscale",
//       url: "https://example.com/three",
//       height: 600,
//     },
//     {
//       id: "3",
//       img: "https://images.unsplash.com/photo-1752649937266-1900d9e176c3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       url: "https://example.com/four",
//       height: 500,
//     },
//     {
//       id: "4",
//       img: "https://images.unsplash.com/photo-1752649937266-1900d9e176c3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       url: "https://example.com/four",
//       height: 800,
//     },
//     // ... more items
//   ];

//   return (
//     <div className="read-blog">
//       <GlitchText
//         speed={1}
//         enableShadows={true}
//         enableOnHover={true}
//         className="custom-class"
//       >
//         Read The Blog
//       </GlitchText>

//       <Masonry
//         items={items}
//         ease="power3.out"
//         duration={0.3}
//         stagger={0.05}
//         animateFrom="bottom"
//         scaleOnHover={true}
//         hoverScale={0.95}
//         blurToFocus={true}
//         colorShiftOnHover={false}
//       />
//     </div>
//   );
// };

// export default ReadBlog;

import GlitchText from "./react-bits/GlitchText";
import "../assets/styles/read-blog.css";
import Masonry from "./react-bits/Masonry"; // Corrected path

const ReadBlog = () => {
  const items = [
    {
      id: "0",
      img: "https://www.bemytravelmuse.com/wp-content/uploads/2025/06/florida-itinerary-26-280x280.jpg",
      url: "https://example.com/one",
      height: 400,
      title: "The Best Things to Do in South Florida", // Added title
    },
    {
      id: "1",
      img: "https://www.bemytravelmuse.com/wp-content/uploads/2025/05/four-seasons-chiang-mai-22-280x280.jpg",
      url: "https://example.com/two",
      height: 250,
      title:
        "Four Seasons Chiang Mai: Where Buffalo Bathtime Is a Real Thing (and It’s Perfect)", // Added title
    },
    {
      id: "2",
      img: "https://www.bemytravelmuse.com/wp-content/uploads/2025/05/intercontinental-khao-yai-18-280x280.jpg",
      url: "https://example.com/three",
      height: 600,
      title:
        "A Whimsical Weekend at InterContinental Khao Yai: Thailand’s Hidden Lakeside Gem", // Added title
    },
    {
      id: "3",
      img: "https://www.bemytravelmuse.com/wp-content/uploads/2021/08/utah-things-to-do-3-1-1-280x280.jpg",
      url: "https://example.com/four",
      height: 500,
      title:
        "Solo Female Travel in Utah: 10 Magical Stops for Adventure, Solitude, and Stunning Scenery", // Added title
    },
    {
      id: "4",
      img: "https://www.bemytravelmuse.com/wp-content/uploads/2023/05/azores-ultimate-guide-4-280x280.jpg",
      url: "https://example.com/four",
      height: 800,
      title:
        "15 “Quiet Life Travel” Destinations Perfect for Solo Female Travelers", // Added title
    },
    {
      id: "5",
      img: "https://www.bemytravelmuse.com/wp-content/uploads/2023/10/monos-luggage-review-1-2-280x280.jpg",
      url: "https://example.com/four",
      height: 600,
      title: "Is Monos Luggage Worth Buying? I Tried it to Find Out!", // Added title
    },
    {
      id: "6",
      img: "https://www.bemytravelmuse.com/wp-content/uploads/2016/11/wildatlanticway-11-280x280.jpg",
      url: "https://example.com/four",
      height: 500,
      title: "What to Pack for a Solo Trip (That You Might Not Think Of)", // Added title
    },
    // ... more items
  ];

  return (
    <div className="read-blog">
      <GlitchText
        speed={1}
        enableShadows={true}
        enableOnHover={true}
        className="custom-class"
      >
        Read The Blog
      </GlitchText>

      <Masonry
        items={items}
        ease="power3.out"
        duration={0.3}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false} // Keeping false for now, as we'll add a new overlay
      />
    </div>
  );
};

export default ReadBlog;
