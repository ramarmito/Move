import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./sidebar.scss";

// route components
import { NavLink } from "react-router-dom";

// components
import LogoutModal from "../modal/LogoutModal";

// mui components
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { user } = useAuthContext();

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <p>MOVE</p>
        <p>Management of Outreach</p>
        <p>Viable Engagement</p>
      </div>
      <div className="center">
        <ul>
          <NavLink exact to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          {(user && user.email === "admin_user1@tip.edu.ph") ||
          (user && user.email === "admin_user2@tip.edu.ph") ||
          (user && user.email === "admin_user3@tip.edu.ph") ||
          (user && user.email === "admin_user4@tip.edu.ph") ||
          (user && user.email === "admin_user5@tip.edu.ph") ||
          (user && user.email === "cecilia.venal@tip.edu.ph") ||
          (user && user.email === "qmcvenal@tip.edu.ph") ||
          (user && user.email === "jtaylar.cpe@tip.edu.ph") ||
          (user && user.email === "qjtaylar@tip.edu.ph") ||
          (user && user.email === "mmiranda.cpe@tip.edu.ph") ||
          (user && user.email === "vvicente.cpe@tip.edu.ph") ||
          (user && user.email === "qcrregio@tip.edu.ph") ||
          (user && user.email === "qramarmito@tip.edu.ph") ||
          (user && user.email === "qmc-garcia@tip.edu.ph") ||
          (user && user.email === "qigbbravo@tip.edu.ph") ||
          (user && user.email === "qjpgaba@tip.edu.ph") ? (
            <NavLink to="/requests" style={{ textDecoration: "none" }}>
              <li>
                <DescriptionIcon className="icon" />
                <span>Requests</span>
              </li>
            </NavLink>
          ) : null}
          <NavLink to="/my-outreach" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsIcon className="icon" />
              <span>My Outreach</span>
            </li>
          </NavLink>
          <NavLink to="/about-us" style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className="icon" />
              <span>About Us</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="bottom">
        <ul>
          <NavLink to="/account-info" style={{ textDecoration: "none" }}>
            <li>
              {user.photoURL && <img src={user.photoURL} alt="" />}
              {!user.photoURL && (
                <AccountCircleOutlinedIcon className="thumbnailIcon" />
              )}
              <div className="nameContainer">
                <div className="name">{user.displayName}</div>
                <div className="gmail">{user.email}</div>
              </div>
            </li>
          </NavLink>
          <li onClick={openLogoutModal}>
            <LogoutOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {showLogoutModal && <LogoutModal closeLogoutModal={closeLogoutModal} />}
    </div>
  );
};

export default Sidebar;
