import React from "react";
import { useDocument } from "../../hooks/useDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "../../components/PDFFile";

// styles
import "./outreach.scss";

// route components
import { useHistory, useParams } from "react-router-dom";

// components
import Sidebar from "../../components/sidebar/Sidebar";
import ImageSlider from "../../components/ImageSlider";

// mui components
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Outreach = () => {
  const { outreachId } = useParams();

  const { document, error } = useDocument("outreach-programs", outreachId);

  const containerStyles = {
    marginTop: "30px",
    width: "34vw",
    height: "280px",
  };

  const history = useHistory();

  return (
    <div className="outreach">
      <Sidebar />
      {error && <div>{error}</div>}
      {document && (
        <div className="outreachContainer">
          <div className="top">
            <div className="headerContainer">
              <ArrowBackIcon className="back" onClick={history.goBack} />
              <p>{document.outreachTitle}</p>
            </div>
            <div className="container">
              <PDFDownloadLink
                className="downloadLink"
                document={
                  <PDFFile
                    editSummaryId={outreachId}
                    // outreachTitle={document && document.outreachTitle}
                    // summary={summary}
                  />
                }
                fileName={`${document && document.outreachTitle} by ${
                  document && document.coordinator
                }`}
              >
                <button>
                  <FileDownloadIcon className="icon" />
                  Download PDF
                </button>
              </PDFDownloadLink>
            </div>
          </div>
          <div className="bottom">
            <div className="bottomLeft">
              <div className="cardBottomLeft">
                <div className="content">
                  <div className="detail">
                    <p className="details">Details</p>
                    <p>Coordinator: {document.coordinator}</p>
                    <p>Beneficiary: {document.beneficiary}</p>
                    <p>Type: {document.type}</p>
                    <p>Target Date: {document.date.toDate().toDateString()}</p>
                  </div>
                </div>
              </div>
              <div style={containerStyles}>
                <ImageSlider outreachPhotos={document.outreachPhotos} />
              </div>
            </div>
            <div className="bottomRight">
              <div className="title">
                <p>Summary</p>
              </div>
              <form>
                <label>
                  <span>Semester:</span>
                  <p className="text">{document.semester}</p>
                </label>
                <label>
                  <span>Academic Year:</span>
                  <p className="text">{document.academicYear}</p>
                </label>
                <label>
                  <span>No. of Participants:</span>
                  <p className="text">{document.numberOfParticipants}</p>
                </label>
                <label>
                  <span>Location:</span>
                  <p className="text">{document.location}</p>
                </label>
                <label>
                  <span>Date Conducted:</span>
                  <p className="text">
                    {document.dateConducted?.toDate().toDateString()}
                  </p>
                </label>
                <label className="summary">
                  <span>Summary:</span>
                  <p className="summaryText" align="justify">
                    {document.summary}
                  </p>
                </label>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outreach;
