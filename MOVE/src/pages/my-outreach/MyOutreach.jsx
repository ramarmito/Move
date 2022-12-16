import React, { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./myOutreach.scss";

// route components
import { Link } from "react-router-dom";

// components
import Sidebar from "../../components/sidebar/Sidebar";

// mui components
import DeleteIcon from "@mui/icons-material/Delete";
import NotesIcon from "@mui/icons-material/Notes";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteModal from "../../components/modal/DeleteModal";

const MyOutreach = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [docId, setDocId] = useState("");

  const { user } = useAuthContext();

  const { deleteDocument } = useFirestore("outreach-programs");

  const handleClick = (doc) => {
    setDocId(doc);
    setShowDeleteModal(true);
  };

  const { documents, error } = useCollection(
    "outreach-programs",
    ["authorId", "==", user.uid],
    ["date", "asc"]
  );

  const count = documents
    ? documents.filter((document) => {
        if (document.authorId === user.uid) {
          return true;
        } else {
          return false;
        }
      })
    : null;

  const approved = documents
    ? documents.filter((document) => {
        if (document.isApproved === true) {
          return true;
        } else {
          return false;
        }
      })
    : null;

  const rejected = documents
    ? documents.filter((document) => {
        if (document.isRejected === true) {
          return true;
        } else {
          return false;
        }
      })
    : null;

  return (
    <div className="myOutreach">
      <Sidebar />
      <div className="myOutreachContainer">
        <div className="top">
          <p>My Outreach</p>
        </div>
        <div className="middle">
          <div className="statusCard">
            <div className="left">
              <div className="header">No. of Proposed Outreach</div>
              <div className="count">{count && count.length}</div>
            </div>
            <div className="middle">
              <div className="header">Approved</div>
              <div className="count">{approved && approved.length}</div>
            </div>
            <div className="right">
              <div className="header">Rejected</div>
              <div className="count">{rejected && rejected.length}</div>
            </div>
          </div>
        </div>
        <div className="bottom">
          {error && <p className="error">{error}</p>}
          {documents &&
            documents.map((document, index) => (
              <div key={index} className="myOutreachCard">
                <div className="left">
                  <div className="title">{document.outreachTitle}</div>
                  {document.isApproved === false &&
                  document.isRejected === false ? (
                    <div className="statusPending">Waiting for Approval</div>
                  ) : null}
                  {document.isApproved === false &&
                  document.isRejected === true ? (
                    <div className="statusRejected">Rejected</div>
                  ) : null}
                  {document.isApproved === true &&
                  document.isComplete === false ? (
                    <div className="statusInProgress">In Progress</div>
                  ) : null}
                  {document.isApproved === true &&
                  document.isComplete === true ? (
                    <div className="statusCompleted">Completed</div>
                  ) : null}
                </div>
                <div className="right">
                  {document.isApproved === false &&
                  document.isRejected === false ? null : (
                    <>
                      {document.isRejected === true ? null : (
                        <>
                          <Link
                            to={`/edit-summary/${document.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <NotesIcon className="icons" />
                          </Link>
                          <Link
                            to={`/outreach/${document.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <VisibilityIcon className="icons" />
                          </Link>
                        </>
                      )}
                      <DeleteIcon
                        className="icons"
                        onClick={() => handleClick(document.id)}
                      />
                      {showDeleteModal && (
                        <DeleteModal
                          deleteDocument={deleteDocument}
                          setShowDeleteModal={setShowDeleteModal}
                          docId={docId}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOutreach;
