import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import PageNotFound from "../pages/PageNotFound";
import { useEffect, useState } from "react";
import SplashScreen from "../pages/SplashScreen";

const MainRoute = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 6000);
  }, []);

  return (
    <Routes>
      <Route path="/" element={showSplash ? <SplashScreen /> : <Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/blog/:id" element={<Blog />} />

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoute;
