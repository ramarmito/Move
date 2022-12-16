import { useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

export const useUpdateSummary = (docId) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updateOutreachSummary = async (
    semester,
    academicYear,
    participants,
    location,
    dateConducted,
    summary,
    isDone
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // update a user document
      await projectFirestore
        .collection("outreach-programs")
        .doc(docId)
        .update({
          semester,
          academicYear,
          numberOfParticipants: participants,
          location,
          dateConducted: timestamp.fromDate(new Date(dateConducted)),
          summary,
          isComplete: isDone,
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

  return { updateOutreachSummary, error, isPending };
};
