import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./requestsCard.scss";

// components
import ViewLetterModal from "../modal/ViewLetterModal";

//mui components
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const RequestsCard = ({ outreach_programs, error }) => {
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [letter, setLetter] = useState("");

  const { updateIsApprovedField } = useFirestore("outreach-programs");

  const { user } = useAuthContext();

  const handleClick = (url) => {
    setLetter(url);
    setShowLetterModal(true);
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {outreach_programs.length === 0 && (
        <p className="empty">No outreach request yet.</p>
      )}
      {outreach_programs.map((outreach) => (
        <div className="requestsCard" key={outreach.id}>
          <div className="cardTop">
            <div className="cardTopLeft">
              {!outreach.isApproved && <div className="status">Pending...</div>}
              <div className="title">{outreach.outreachTitle}</div>
            </div>
            <div className="cardTopRight">
              <button onClick={() => handleClick(outreach.storageURL)}>
                <VisibilityIcon className="icon" />
                View Letter
              </button>
              {showLetterModal && (
                <ViewLetterModal
                  setShowLetterModal={setShowLetterModal}
                  letter={letter}
                />
              )}
            </div>
          </div>
          <div className="cardBottom">
            <div className="cardBottomLeft">
              <p className="details">Details</p>
              <p className="label">
                Coordinator: <span>{outreach.coordinator}</span>
              </p>
              <p className="label">
                Beneficiary: <span>{outreach.beneficiary}</span>
              </p>
              <p className="label">
                Type: <span> {outreach.type}</span>
              </p>
              <p className="label">
                Target Date:{" "}
                <span>{outreach.date.toDate().toDateString()}</span>
              </p>
            </div>
            <div className="cardBottomRight">
              {outreach.authorId !== user.uid && (
                <>
                  <button
                    className="approve"
                    onClick={() => {
                      updateIsApprovedField({ isApproved: true }, outreach.id);
                    }}
                  >
                    <ThumbUpAltIcon className="icon" />
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => {
                      updateIsApprovedField({ isRejected: true }, outreach.id);
                    }}
                  >
                    <ThumbDownAltIcon className="icon" />
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestsCard;
