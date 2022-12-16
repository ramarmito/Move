import React from "react";
import { useCollection } from "../../hooks/useCollection";

// styles
import "./request.scss";

// components
import Sidebar from "../../components/sidebar/Sidebar";
import RequestsCard from "../../components/card/RequestsCard";

const Requests = () => {
  const { documents, error } = useCollection(
    "outreach-programs",
    ["isApproved", "==", false],
    ["date", "asc"]
  );

  const outreach_proposals = documents
    ? documents.filter((document) => {
        if (document.isRejected === true) {
          return false;
        } else {
          return true;
        }
      })
    : null;

  return (
    <div className="requests">
      <Sidebar />
      <div className="requestsContainer">
        <div className="top">
          <p>Request for Approval</p>
        </div>
        <div className="bottom">
          {documents && (
            <RequestsCard
              outreach_programs={outreach_proposals}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
