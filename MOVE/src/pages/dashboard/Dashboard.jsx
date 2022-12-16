import React, { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./dashboard.scss";

// components
import Sidebar from "../../components/sidebar/Sidebar";
import Card from "../../components/card/Card";
import ProposeOutreachModal from "../../components/modal/ProposeOutreachModal";
import Filter from "../../components/filter/Filter";

const Dashboard = () => {
  const [showProposeModal, setShowProposeModal] = useState(false);

  const closeProposeModal = () => {
    setShowProposeModal(false);
  };

  const openProposeModal = () => {
    setShowProposeModal(true);
  };

  const { documents, error } = useCollection(
    "outreach-programs",
    ["isApproved", "==", true],
    ["date", "asc"]
  );

  const { user } = useAuthContext();

  const [filter, setFilter] = useState("All");

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const outreach_programs = documents
    ? documents.filter((document) => {
        switch (filter) {
          case "All":
            return true;
          case "Mine":
            let assignedToMe = false;
            if (document.authorId === user.uid) {
              assignedToMe = true;
            }
            return assignedToMe;
          // case "Educational":
          // case "Skills Development":
          //   return document.type === filter;
          case "In Progress":
            let inProgress = false;
            if (document.isComplete === false) {
              inProgress = true;
            }
            return inProgress;
          case "Completed":
            let completed = false;
            if (document.isComplete === true) {
              completed = true;
            }
            return completed;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="top">
          <div className="topLeft">
            <p>
              Dashboard/ <span>{filter}</span>
            </p>
            <button onClick={openProposeModal}>+ Add Outreach Proposal</button>
          </div>
          <div className="topRight">
            {/* <input type="text" placeholder="All Statuses" list="status" />
            <datalist id="status">
              <option value="In Progress" />
              <option value="Completed" />
            </datalist> */}
            {documents && <Filter changeFilter={changeFilter} />}
          </div>
        </div>
        <div className="bottom">
          {documents && (
            <Card outreach_programs={outreach_programs} error={error} />
          )}
        </div>
        {showProposeModal && (
          <ProposeOutreachModal closeProposeModal={closeProposeModal} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
