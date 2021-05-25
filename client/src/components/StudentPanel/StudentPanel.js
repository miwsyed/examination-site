import React from "react";
import { Link } from "react-router-dom";

const StudentPanel = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <label>Click below to View your exam details </label>

            <Link
              className="btn"
              style={{ textDecoration: "none", color: "white" }}
              to="/viewstudentexam"
            >
              View
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <label>Click below to See your profile</label>
            <Link
              className="btn"
              style={{ textDecoration: "none", color: "white" }}
              to="/viewstudentprofile"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPanel;
