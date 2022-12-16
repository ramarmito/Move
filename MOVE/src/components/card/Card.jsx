import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useFirestore } from "../../hooks/useFirestore.js";

// styles
import "./card.scss";

// route components
import { Link } from "react-router-dom";

// components
import DeleteModal from "../modal/DeleteModal.jsx";

// mui components
import DeleteIcon from "@mui/icons-material/Delete";
import NotesIcon from "@mui/icons-material/Notes";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Card = ({ outreach_programs, error }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [docId, setDocId] = useState("");

  const { user } = useAuthContext();

  const { deleteDocument } = useFirestore("outreach-programs");

  const handleClick = (doc) => {
    setDocId(doc);
    setShowDeleteModal(true);
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {outreach_programs.length === 0 && (
        <p className="empty">No approved outreach yet.</p>
      )}
      {outreach_programs.map((outreach) => (
        <div className="card" key={outreach.id}>
          <div
            className={outreach.isComplete === true ? "cardTop" : "cardTop2"}
          >
            <div className="cardTopLeft">
              {!outreach.isComplete && (
                <div className="statusInProgress">In Progress</div>
              )}
              {outreach.isComplete && (
                <div className="statusComplete">Completed</div>
              )}
              <div className="title">{outreach.outreachTitle}</div>
            </div>
            <div className="cardTopRight">
              {outreach.authorId === user.uid && (
                <DeleteIcon
                  className="deleteIcon"
                  onClick={() => handleClick(outreach.id)}
                />
              )}
              {showDeleteModal && (
                <DeleteModal
                  deleteDocument={deleteDocument}
                  setShowDeleteModal={setShowDeleteModal}
                  docId={docId}
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
              {outreach.authorId === user.uid && (
                <Link
                  to={`/edit-summary/${outreach.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button>
                    <NotesIcon className="icon" />
                    Edit Summary
                  </button>
                </Link>
              )}
              <Link
                to={`/outreach/${outreach.id}`}
                style={{ textDecoration: "none" }}
              >
                <button>
                  <VisibilityIcon className="icon" />
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
