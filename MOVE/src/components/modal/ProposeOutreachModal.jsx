import React, { useState, useEffect } from "react";
import { timestamp } from "../../firebase/config";
import { useFirestoreAndStorage } from "../../hooks/useFirestoreAndStorage";

// styles
import "./proposeOutreachModal.scss";

// mui components
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ProposeOutreachModal = ({ closeProposeModal }) => {
  const [outreachTitle, setOutreachTitle] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [letter, setLetter] = useState(null);
  const [letterError, setLetterError] = useState(null);

  const { addDocumentAndStorage, response } = useFirestoreAndStorage(
    "outreach-programs",
    "letters"
  );

  const handleFileChange = (e) => {
    setLetter(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setLetterError("Please select a file");
      return;
    }
    if (!selected.name.includes(".pdf")) {
      setLetterError("Selected file must be pdf");
      return;
    }

    setLetterError(null);
    setLetter(selected);
    console.log("letter updated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocumentAndStorage(
      {
        outreachTitle,
        coordinator,
        beneficiary,
        type,
        date: timestamp.fromDate(new Date(date)),
      },
      letter
    );
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      closeProposeModal();
    }
  }, [response.success]);

  return (
    <div className="proposeOutreachModal">
      <div className="modal">
        <header>
          <p>Propose an Outreach</p>
          <HighlightOffIcon className="icon" onClick={closeProposeModal} />
        </header>
        <div className="content">
          {/* LEFT */}
          <div className="left">
            <img src={require("./event.png")} alt="" />
          </div>
          {/* RIGHT */}
          <div className="right">
            <form onSubmit={handleSubmit}>
              <label>
                <span>Outreach Title:</span>
                <input
                  type="text"
                  onChange={(e) => setOutreachTitle(e.target.value)}
                />
              </label>
              <label>
                <span>Coordinator:</span>
                <input
                  type="text"
                  onChange={(e) => setCoordinator(e.target.value)}
                />
              </label>
              <label>
                <span>Beneficiary:</span>
                <input
                  type="text"
                  onChange={(e) => setBeneficiary(e.target.value)}
                />
              </label>
              <label>
                <span>Type:</span>
                <input
                  type="text"
                  list="type"
                  onChange={(e) => setType(e.target.value)}
                />
                <datalist id="type">
                  <option value="Education" />
                  <option value="Psychosocial Interventions" />
                  <option value="Health and Medical Services" />
                  <option value="Skills Development" />
                </datalist>
              </label>
              <label>
                <span>Date:</span>
                <input type="date" onChange={(e) => setDate(e.target.value)} />
              </label>
              <label>
                <span>Outreach Proposal Letter:</span>
                <input type="file" onChange={handleFileChange} />
                {letterError && <p>{letterError}</p>}
              </label>
              <div className="option">
                {!response.isPending && (
                  <button className="submit">Submit</button>
                )}
                {response.isPending && (
                  <button className="submit" disabled>
                    Submitting...
                  </button>
                )}
                <button className="cancel" onClick={closeProposeModal}>
                  Cancel
                </button>
              </div>
              {response.error && <p>{response.error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposeOutreachModal;
