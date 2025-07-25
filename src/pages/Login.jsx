import { useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <i className="ri-arrow-left-line back" onClick={() => navigate("/")}></i>

      <h1>Sign Up to Get Updated on Future Tours</h1>
      <div className="main">
        <div className="form">
          <div className="icon">
            {/* <i class="ri-user-line"></i> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 48 48"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M24 24c4.42 0 8-3.58 8-8s-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8m10-8c0 5.525-4.475 10-10 10s-10-4.475-10-10S18.475 6 24 6s10 4.475 10 10M9.223 34.212C8.22 35.022 8 35.629 8 36v4h32v-4c0-.37-.22-.979-1.224-1.788c-.98-.791-2.442-1.545-4.214-2.197C31.02 30.712 26.753 30 24 30s-7.02.712-10.562 2.015c-1.772.652-3.234 1.406-4.215 2.197M24 28c-6.007 0-18 3.035-18 8v6h36v-6c0-4.965-11.992-8-18-8"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="container">
            <div>
              <i className="ri-user-fill"></i>
              <input type="email" placeholder="Email ID" />
            </div>

            <div>
              <i className="ri-lock-2-fill"></i>
              <input type="password" placeholder="Password" />
            </div>

            <p>
              <i>Forgot Password?</i>
            </p>
          </div>
        </div>
        <div className="btn">
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
