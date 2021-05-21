import React from "react";
import ExamsetPaper from "./ExamsetPaper";

const AdminPage = () => {
  return (
    <div style={{ fontFamily: "cairo,sansSerif" }}>
      <div>
        <h2 style={{ textAlign: "center" }} className="container shadow w-25">
          Welcome Admin
        </h2>
      </div>
      <ExamsetPaper />
    </div>
  );
};

export default AdminPage;
