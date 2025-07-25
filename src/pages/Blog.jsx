import { useParams } from "react-router-dom";
import FlyingPosters from "../components/react-bits/FlyingPosters";
import { blogContent } from "../assets/blogContent";
import "../assets/styles/blog.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

const Blog = () => {
  const { id } = useParams();
  const blog = blogContent[0];

  useEffect(() => {
    document.querySelector(".summary").innerHTML = `${blog.summary}`;
  }, []);

  console.log("Blog = ", blog);

  const blogSection = blog.sections.map((b, idx) => (
    <div key={idx} className="sections">
      <h2>{b.heading}</h2>

      {/* <div className="content"> */}
      {b.content.split("<br>").map((c, id) => (
        <p key={id}>{c}</p>
      ))}
      {/* </div> */}
    </div>
  ));

  return (
    <div className="blog-container">
      <div className="blog-content">
        <div>
          <h1>{blog.title}</h1>
          <p className="author">
            {blog.postedDate} - {blog.author}
          </p>
          <p className="summary"></p>

          {blogSection}
        </div>
      </div>

      <div className="blog-gallery">
        <FlyingPosters items={blog.images} />
      </div>

      <Navbar />
    </div>
  );
};

export default Blog;
