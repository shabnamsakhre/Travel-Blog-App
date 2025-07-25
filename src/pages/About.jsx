import "../assets/styles/about.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlareHover from "../components/react-bits/GlareHover";

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        {/* <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#1a1a1a",
            gap: "20px",
          }}
        >
          <GlareHover>
            <h2>Default Glare</h2>
            <p>This is some content.</p>
          </GlareHover>

          <GlareHover
            width="250px"
            height="150px"
            background="#ff6b6b"
            borderColor="#e04e4e"
            glareColor="#ffe0b2"
            glareOpacity={0.6}
            glareAngle={135}
            animationDuration={4000}
          >
            <h3>Custom Glare Box</h3>
            <p>Another example.</p>
          </GlareHover>
          </div> */}

        <div className="img">
          <GlareHover
            width="100%"
            height="100%"
            glareColor="#ffe0b2"
            glareOpacity={0.6}
            glareAngle={135}
            animationDuration={4000}
          >
            <img
              src="https://www.bemytravelmuse.com/wp-content/uploads/2021/07/truck-bed-camping.jpg"
              alt="profile"
            />
          </GlareHover>
        </div>
        <div className="content">
          <h1>Hi, I’m Kristin</h1>
          <p>
            My vision of a better world is one where more women are empowered,
            brave, and confident in their abilities. Where we explore other
            cultures, spend more time in nature, and come to know ourselves
            better. Solo traveling is the best thing I’ve found to promote these
            qualities.
          </p>
          <p>
            I started Be My Travel Muse in September 2012 right after leaving a
            corporate job in California and buying a one-way ticket to Bangkok.
          </p>
          <p>
            Twelve years later I’ve had some wild adventures, including
            hitchhiking solo across China, freediving with humpback whales in
            the South Pacific, hitchhiking through Patagonia, hiking for 14 days
            to over 18k feet in Nepal without a guide, leading women’s adventure
            tours all around the world, and even becoming a mom in 2022.
          </p>
          <p>
            I’ve lived in Taiwan (and speak rusty Mandarin!), spent four and a
            half years in Berlin (and do not speak German!), and now call Nevada
            my home, though I will always be a California girl at heart.
          </p>
          <p>
            Though I had very humble beginnings, now this blog is read by
            millions of people annually, and has become a community for solo
            female travelers the world over. Vogue, Buzzfeed, the Washington
            Post, Business Insider, Cosmopolitan, and more have sought my solo
            travel advice for women (and anyone and everyone) just like you.{" "}
          </p>
          <p>
            These days Be My Travel Muse is so much more than a blog. It’s a
            place for women to find adventure tours, as well as bespoke travel
            planning services offered by me, based on experiences in 65
            countries around the world, 15 of which I’ve traveled to with a
            toddler. Planning dream trips has been my job for over a decade, so
            if you need any help with planning, email me.
          </p>
          <p>
            You can keep in touch with me on Instagram, and my weekly
            newsletter.
          </p>
          {/* <p>
          Each week, I share my most helpful miles and points tips and tricks
          and the best travel deals in my newsletter. We never spam. Join us
          here:
        </p> */}
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>

      <Navbar />
    </div>
  );
};

export default About;
