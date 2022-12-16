import React from "react";
import { useLogout } from "../../hooks/useLogout";

// styles
import "./logoutModal.scss";

// route components
import { Link } from "react-router-dom";

// mui components
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const LogoutModal = ({ closeLogoutModal }) => {
  const { logout } = useLogout();

  return (
    <div className="logoutModal">
      <div className="modal">
        <div className="close">
          <HighlightOffIcon className="icon" onClick={closeLogoutModal} />
        </div>
        <div className="warning">
          <p>You are attempting to log out of MOVE.</p>
          <p>Are you sure?</p>
        </div>
        <div className="buttons">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="yes" onClick={logout}>
              Yes, Logout
            </button>
          </Link>
          <button className="no" onClick={closeLogoutModal}>
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
