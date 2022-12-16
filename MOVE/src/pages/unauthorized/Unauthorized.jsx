import React from "react";

// styles
import "./unauthorized.scss";

// components
import Sidebar from "../../components/sidebar/Sidebar";

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <Sidebar />
      <div className="unauthorizedContainer">Unauthorized</div>
    </div>
  );
};

export default Unauthorized;
