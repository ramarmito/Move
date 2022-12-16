import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useUpdateDetails } from "../../hooks/useUpdateDetails";
import { useUpdateThumbnail } from "../../hooks/useUpdateThumbnail";

// styles
import "./accountInfo.scss";

// components
import Sidebar from "../../components/sidebar/Sidebar";

// mui components
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CancelIcon from "@mui/icons-material/Cancel";

const AccountInfo = () => {
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const [newThumbnail, setNewThumbnail] = useState(false);
  const [updateThumbnail, setUpdateThumbnail] = useState(false);

  const { user } = useAuthContext();

  const { documents } = useCollection("users", ["uid", "==", user.uid], null);

  const {
    updateProfileDetails,
    error: updateDetailsError,
    isPending: updateDetailsPending,
  } = useUpdateDetails();

  const {
    updateProfileThumbnail,
    error: updateThumbnailError,
    isPending: updateThumbnailPending,
  } = useUpdateThumbnail();

  useEffect(() => {
    documents &&
      documents.map((document) => {
        setDisplayName(document.displayName);
        setFirstName(document.firstName);
        setLastName(document.lastName);
        setRole(document.role);
        setDepartment(document.department);
        setThumbnail(document.photoURL);
      });
  }, [documents]);

  useEffect(() => {
    setDisplayName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  const handleFileChange = (e) => {
    setThumbnail(null);
    setNewThumbnail(false);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 1000000) {
      setThumbnailError("Image file size must be less than 1mb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    setNewThumbnail(true);
    console.log("thumbnail updated");
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    updateProfileDetails(displayName, firstName, lastName, role, department);
  };

  const handleUpdateThumbnail = async (e) => {
    e.preventDefault();
    await updateProfileThumbnail(thumbnail);
    setUpdateThumbnail(false);
  };

  return (
    <div className="accountInfo">
      <Sidebar />
      <div className="accountInfoContainer">
        {/* LEFT*/}
        <div className="left">
          <div className="top">Account Information</div>
          <div className="bottom">
            <div className="thumbnailContainer">
              {user.photoURL && <img src={user.photoURL} alt="" />}
              {!user.photoURL && (
                <AccountCircleOutlinedIcon className="avatar" />
              )}
              <div className="iconContainer">
                <CameraAltIcon
                  className="cameraIcon"
                  onClick={() => {
                    setUpdateThumbnail(true);
                  }}
                />
              </div>
            </div>
            {updateThumbnail ? (
              <>
                <div className="buttonUpload">
                  <input type="file" onChange={handleFileChange} />
                  <CancelIcon
                    className="cancelIcon"
                    onClick={() => {
                      setUpdateThumbnail(false);
                      setNewThumbnail(false);
                      setThumbnailError(null);
                    }}
                  />
                </div>
                {thumbnailError && <p>{thumbnailError}</p>}
              </>
            ) : null}
            {updateThumbnail && newThumbnail ? (
              <>
                {!updateThumbnailPending && (
                  <button onClick={handleUpdateThumbnail}>
                    Update Profile Picture
                  </button>
                )}
                {updateThumbnailPending && (
                  <button disabled>Uploading Photo...</button>
                )}
                {updateThumbnailError && (
                  <p className="error">{updateThumbnailError}</p>
                )}
              </>
            ) : null}
          </div>
        </div>
        {/* RIGHT */}
        <div className="right">
          <form>
            <label>
              <span>First Name</span>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                defaultValue={firstName}
              />
            </label>
            <label>
              <span>Last Name</span>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                defaultValue={lastName}
              />
            </label>
            <label>
              <span>Department</span>
              <input
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
                defaultValue={department}
              />
            </label>
            <label>
              <span>Role</span>
              <input
                type="text"
                list="roles"
                onChange={(e) => setRole(e.target.value)}
                defaultValue={role}
              />
              <datalist id="roles">
                <option value="Department Head" />
                <option value="SOCIP Head" />
                <option value="Outreach Head" />
                <option value="Student" />
              </datalist>
            </label>
            <div className="button">
              <div className="buttonSave">
                {!updateDetailsPending && (
                  <button className="save" onClick={handleUpdateDetails}>
                    Save Changes
                  </button>
                )}
                {updateDetailsPending && (
                  <button className="saving" disabled>
                    Saving Changes...
                  </button>
                )}
              </div>
              <div className="buttonCancel">
                <button className="cancel">Cancel</button>
              </div>
            </div>
            {updateDetailsError && <p>{updateDetailsError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
