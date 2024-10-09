import React from "react";
import MedicalHistoryComponent from "../components/MedicalHistoryCom";
import { useAuth } from "../context/AuthContext";

const MedicalHistory = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {/* Pass the currentUser to the component */}
      <MedicalHistoryComponent currentUser={currentUser} />
    </div>
  );
};

export default MedicalHistory;
