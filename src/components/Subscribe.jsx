import "../assets/styles/subscribe.css";

const Subscribe = () => {
  return (
    <div className="subscribe">
      <div className="profile">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/1*VCjMbZcJnc7zvXB_qGLATA.jpeg"
          alt="profile"
        />
        <p>
          Hey there, I'm Kristin. Welcome to one of the most-read women’s travel
          blogs in the world. Join us each week when I share my insider
          knowledge of the best travel deals and miles and points building tips
          in my newsletter. Join here!
        </p>
      </div>

      <form>
        <input type="text" placeholder="John" />
        <input type="email" placeholder="john@email.com" />
        <button type="button">Subscribe</button>
      </form>
    </div>
  );
};

export default Subscribe;
