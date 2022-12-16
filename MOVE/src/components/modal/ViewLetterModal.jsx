import React from "react";

// styles
import "./viewLetterModal.scss";

// mui components
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ViewLetterModal = ({ setShowLetterModal, letter }) => {
  return (
    <div className="editDetailsModal">
      <div className="modal">
        <header>
          <p>Proposal Letter</p>
          <HighlightOffIcon
            className="icon"
            onClick={() => setShowLetterModal(false)}
          />
        </header>
        <embed
          type="application/pdf"
          src={letter}
          width={100 + "%"}
          height={100 + "%"}
        />
      </div>
    </div>
  );
};

export default ViewLetterModal;
