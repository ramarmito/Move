import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useUpdateDetails = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();

  const updateProfileDetails = async (
    displayName,
    firstName,
    lastName,
    role,
    department
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // add display name and photo URL  to user
      await user.updateProfile({ displayName });

      // update a user document
      await projectFirestore.collection("users").doc(user.uid).update({
        displayName,
        firstName,
        lastName,
        role,
        department,
      });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { updateProfileDetails, error, isPending };
};
