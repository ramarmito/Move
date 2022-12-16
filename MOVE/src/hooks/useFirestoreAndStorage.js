import { useState, useEffect, useReducer } from "react";
import {
  projectFirestore,
  projectStorage,
  timestamp,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT_AND_FILE":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestoreAndStorage = (collection, folder) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const { user } = useAuthContext();

  // collection ref
  const ref = projectFirestore.collection(collection);

  // storage folder name
  const folderName = folder;

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocumentAndStorage = async (doc, file) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());

      const uploadPath = `${folderName}/${user.uid}/${file.name}`;
      const storage = await projectStorage.ref(uploadPath).put(file);
      const storageURL = await storage.ref.getDownloadURL();

      const author = user.displayName;
      const authorId = user.uid;

      const addedDocument = await ref.add({
        ...doc,
        createdAt,
        storageURL,
        author,
        authorId,
        isApproved: false,
        isRejected: false,
        isComplete: false,
        semester: null,
        academicYear: null,
        numberOfParticipants: null,
        location: null,
        dateConducted: null,
        summary: null,
        outreachPhotos: [],
      });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT_AND_FILE",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocumentAndStorage, response };
};
