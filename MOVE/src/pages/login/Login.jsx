import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// styles
import "./login.scss";

// route components
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login">
      {/* LEFT */}
      <div className="left">
        <div className="top">MOVE Planner</div>
        <div className="center">
          <div className="loginInstructionsContainer">
            <p>Welcome!</p>
            <p>
              To access your planner, please input your login details in the
              below field.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Email</span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            <div className="button">
              {!isPending && <button>Login</button>}
              {isPending && <button disabled>Logging in...</button>}
              {error && <p>{error}</p>}
            </div>
          </form>
        </div>
        <div className="bottom">
          <p>New to ReachOut?</p>
          <Link to="/create-account" style={{ textDecoration: "none" }}>
            <p className="link">Create an account</p>
          </Link>
        </div>
      </div>
      {/* RIGHT */}
      <div className="right">
        <div className="top">
          <p className="title">MOVE</p>
          <p className="subtitle">Management of Outreach Viable Engagement</p>
        </div>
        <div className="bottom">
          <img src={require("./scrum-board.png")} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
