import React, { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";

// styles
import "./createAccount.scss";

// route components
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const [inputError, setInputError] = useState(null);

  const { signup, isPending, error } = useSignup();

  const options = [
    { value: "Department Head", label: "Department Head" },
    { value: "Outreach Head", label: "Outreach Head" },
    { value: "Student", label: "Student" },
  ];

  useEffect(() => {
    setDisplayName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@tip.edu.ph")) {
      setInputError("Please use institutional email for your account.");
      return;
    }
    if (password !== confirmPassword) {
      setInputError("Passwords do NOT match.");
      return;
    }
    setInputError(null);
    signup(email, password, displayName, firstName, lastName, role, department);
  };

  return (
    <div className="createAccount">
      {/* LEFT */}
      <div className="left">
        <div className="top">
          <p>Welcome to MOVE!</p>
          <p>
            Get access to key features and plan your next outreach smoothly!
          </p>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div className="container">
              <label>
                <span>First Name</span>
                <input
                  required
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </label>
              <label>
                <span>Last Name</span>
                <input
                  required
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </label>
            </div>
            <label className="email">
              <span>
                Email <span className="reminder">*use institutional email</span>
              </span>
              <input
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <div className="container">
              <label>
                <span>Role</span>
                <input
                  required
                  type="text"
                  list="roles"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                />
                <datalist id="roles">
                  <option value="Department Head" />
                  <option value="SOCIP Head" />
                  <option value="Outreach Head" />
                  <option value="Student" />
                </datalist>
              </label>
              <label>
                <span>Department</span>
                <input
                  required
                  type="text"
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                />
              </label>
            </div>
            <div className="container">
              <label>
                <span>
                  Password{" "}
                  <span className="reminder">*atleast 6 characters</span>
                </span>
                <input
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
              <label>
                <span>Confirm Password</span>
                <input
                  required
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </label>
            </div>
            {/* <div className="privacy">
              <input type="checkbox" />
              <p>
                Yes, I understand and agree to ReachOut{" "}
                <span>Terms of Service,</span>
                including the <span>User Agreement</span> and{" "}
                <span>Privacy Policy</span>.
              </p>
            </div> */}
            <div className="button">
              {!isPending && <button>Create Account</button>}
              {isPending && <button disabled>Loading...</button>}
              {inputError && <p>{inputError}</p>}
              {error && <p>{error}</p>}
            </div>
          </form>
          <div className="signup">
            <p>Already have an account?</p>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <p className="link">Sign in here</p>
            </Link>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="right">
        <div className="top">
          <p className="title">MOVE</p>
          <p className="subtitle">Management of Outreach Viable Engagement</p>
        </div>
        <div className="bottom">
          <img src={require("./event.png")} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
