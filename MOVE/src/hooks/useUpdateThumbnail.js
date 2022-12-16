import { useState, useEffect } from "react";
import { projectFirestore, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useUpdateThumbnail = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();

  const updateProfileThumbnail = async (thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // upload user thumbnail
      const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgUrl = await img.ref.getDownloadURL();

      // add display name and photo URL  to user
      await user.updateProfile({ photoURL: imgUrl });

      // update a user document
      await projectFirestore.collection("users").doc(user.uid).update({
        photoURL: imgUrl,
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

  return { updateProfileThumbnail, error, isPending };
};
