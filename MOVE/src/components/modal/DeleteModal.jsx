import React from "react";

// styles
import "./deleteModal.scss";

// mui components
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const DeleteModal = ({ deleteDocument, setShowDeleteModal, docId }) => {
  const handleClick = () => {
    deleteDocument(docId);
    setShowDeleteModal(false);
  };

  return (
    <div className="deleteModal">
      <div className="modal">
        <div className="close">
          <HighlightOffIcon
            className="icon"
            onClick={() => setShowDeleteModal(false)}
          />
        </div>
        <div className="warning">
          <p>You are attempting to delete this Outreach.</p>
          <p>Are you sure?</p>
        </div>
        <div className="buttons">
          <button
            className="delete"
            onClick={() => {
              handleClick();
            }}
          >
            Delete
          </button>
          <button className="cancel" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
