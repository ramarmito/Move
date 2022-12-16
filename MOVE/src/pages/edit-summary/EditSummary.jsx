import React, { useEffect, useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useUpdateSummary } from "../../hooks/useUpdateSummary";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore, projectStorage } from "../../firebase/config";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "../../components/PDFFile";

// styles
import "./editSummary.scss";

// route components
import { useHistory, useParams } from "react-router-dom";

// components
import Sidebar from "../../components/sidebar/Sidebar";
import ImageSlider from "../../components/ImageSlider";

// mui components
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditSummary = () => {
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [participants, setParticipants] = useState("");
  const [location, setLocation] = useState("");
  const [dateConducted, setDateConducted] = useState("");
  const [summary, setSummary] = useState("");
  const [isDone, setIsDone] = useState(null);

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  const [thumbnailError, setThumbnailError] = useState(null);

  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { editSummaryId } = useParams();

  const { document, error: fetchingError } = useDocument(
    "outreach-programs",
    editSummaryId
  );

  const { user } = useAuthContext();

  useEffect(() => {
    if (document) {
      setSemester(document.semester);
      setAcademicYear(document.academicYear);
      setParticipants(document.numberOfParticipants);
      setLocation(document.location);
      setDateConducted(document.dateConducted);
      setSummary(document.summary);
      setIsDone(document.isComplete);
      if (document.dateConducted !== null) {
        const date = document.dateConducted.toDate();

        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        const formattedToday = yyyy + "-" + mm + "-" + dd;

        setDateConducted(formattedToday);
      }
    }
  }, [document]);

  const handleChange = (e) => {
    let imageArray = [];
    setImages([]);
    setUrls([]);

    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];

      if (!newImage) {
        setThumbnailError("Please select a file");
        return;
      }
      if (!newImage.type.includes("image")) {
        setThumbnailError("Selected file must be an image");
        return;
      }
      if (newImage.size > 1000000) {
        setThumbnailError("Image file size must be less than 1mb");
        return;
      }

      imageArray.push(newImage);

      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);

      setThumbnailError(null);
      console.log(newImage);
    }

    if (imageArray.length > 3) {
      setThumbnailError("Maximum of 3 photos only");
      return;
    }
  };

  const handleUpload = () => {
    console.log(images);

    images.map((image) => {
      const storageUpload = async () => {
        setError(null);
        setIsPending(true);

        try {
          const uploadPath = `outreachPhotos/${user.uid}/${editSummaryId}/${image.name}`;
          const img = await projectStorage.ref(uploadPath).put(image);
          const imgUrl = await img.ref.getDownloadURL();
          setUrls((prevState) => [...prevState, imgUrl]);

          if (!isCancelled) {
            setIsPending(false);
            setError(null);
            setImages([]);
          }
        } catch (err) {
          if (!isCancelled) {
            setError(err.message);
            setIsPending(false);
          }
        }
      };
      storageUpload();
    });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  if (urls.length > 0) {
    const firestoreUpload = async () => {
      await projectFirestore
        .collection("outreach-programs")
        .doc(editSummaryId)
        .update({
          outreachPhotos: urls,
        });
    };
    firestoreUpload();
  }

  const {
    updateOutreachSummary,
    error: updateSummaryError,
    isPending: updateSummaryPending,
  } = useUpdateSummary(editSummaryId);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOutreachSummary(
      semester,
      academicYear,
      participants,
      location,
      dateConducted,
      summary,
      isDone
    );
  };

  const containerStyles = {
    marginTop: "30px",
    width: "34vw",
    height: "280px",
  };

  const history = useHistory();

  return (
    <div className="editSummary">
      <Sidebar />
      <div className="editSummaryContainer">
        <div className="top">
          <div className="headerContainer">
            <ArrowBackIcon className="back" onClick={history.goBack} />
            <p>Edit Summary</p>
          </div>
          <div className="container">
            <div className="checkBox">
              <input
                type="checkbox"
                defaultChecked={isDone}
                onChange={(e) => setIsDone(e.target.checked)}
              />
              <span>Mark as Done</span>
            </div>
            <PDFDownloadLink
              className="downloadLink"
              document={
                <PDFFile
                  editSummaryId={editSummaryId}
                  // outreachTitle={document && document.outreachTitle}
                  // summary={summary}
                />
              }
              fileName={`${document && document.outreachTitle} by ${
                document && document.coordinator
              }`}
            >
              {/* {({ loading }) =>
            loading ? (
              <button>Loading Document...</button>
            ) : (
              
            )
          } */}
              <button>
                <FileDownloadIcon className="icon" />
                Download PDF
              </button>
            </PDFDownloadLink>
          </div>
        </div>
        <div className="bottom">
          {fetchingError && <div>{fetchingError}</div>}
          <div className="bottomLeft">
            <div className="cardBottomLeft">
              {document && (
                <div className="content">
                  <div className="title">
                    <p>{document.outreachTitle}</p>
                  </div>
                  <div className="detail">
                    <p className="details">Details</p>
                    <p>Coordinator: {document.coordinator}</p>
                    <p>Beneficiary: {document.beneficiary}</p>
                    <p>Type: {document.type}</p>
                    <p>Target Date: {document.date.toDate().toDateString()}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="imageBottomLeft">
              <div className="content">
                <div className="title">
                  <p>Upload Outreach Photos</p>
                </div>
                <div className="note">
                  <p>*Note: Maximum of 3 photos only</p>
                </div>
                <div className="imageUpload">
                  <input type="file" multiple onChange={handleChange} />
                </div>
                <div className="option">
                  {!isPending && (
                    <button
                      className="upload"
                      disabled={thumbnailError}
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  )}
                  {isPending && (
                    <button className="uploading" disabled={true}>
                      Uploading...
                    </button>
                  )}
                  <button className="cancel">Cancel</button>
                </div>
              </div>
              {thumbnailError && (
                <p className="thumbnailError">{thumbnailError}</p>
              )}
              {error && <p className="uploadError">{error}</p>}
            </div>
            {document && (
              <div style={containerStyles}>
                <ImageSlider outreachPhotos={document.outreachPhotos} />
              </div>
            )}
          </div>
          <div className="bottomRight">
            <div className="title">
              <p>Outreach Summary Form</p>
            </div>
            <form>
              <label>
                <span>Semester:</span>
                <input
                  type="text"
                  onChange={(e) => setSemester(e.target.value)}
                  defaultValue={semester}
                />
              </label>
              <label>
                <span>Academic Year:</span>
                <input
                  type="text"
                  onChange={(e) => setAcademicYear(e.target.value)}
                  defaultValue={academicYear}
                />
              </label>
              <label>
                <span>No. of Participants:</span>
                <input
                  type="text"
                  onChange={(e) => setParticipants(e.target.value)}
                  defaultValue={participants}
                />
              </label>
              <label>
                <span>Location:</span>
                <input
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  defaultValue={location}
                />
              </label>
              <label>
                <span>Date Conducted:</span>
                <input
                  type="date"
                  onChange={(e) => setDateConducted(e.target.value)}
                  defaultValue={dateConducted}
                />
              </label>
              <label>
                <span>Summary:</span>
                <textarea
                  onChange={(e) => setSummary(e.target.value)}
                  defaultValue={summary}
                />
              </label>
              <div className="option">
                {!updateSummaryPending && (
                  <button className="save" onClick={handleSubmit}>
                    Save
                  </button>
                )}
                {updateSummaryPending && (
                  <button className="saving" disabled>
                    Saving changes...
                  </button>
                )}
                <button className="cancel">Cancel</button>
                {updateSummaryError && <p>{updateSummaryError}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSummary;
