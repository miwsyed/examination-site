import React from "react";
import { Link } from "react-router-dom";

import "./ExamPaper.css";

const ExamsetPaper = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <label>Click below to set your exam details and date</label>

            <Link
              className="btn"
              style={{ textDecoration: "none", color: "white" }}
              to="/createExam"
            >
              Set Exam
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <label>Click below to add and update student details</label>
            <Link
              className="btn"
              style={{ textDecoration: "none", color: "white" }}
              to="/vieweditstudents"
            >
              View
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <label>Click below to view upcoming examinations</label>
            <Link
              className="btn"
              style={{ textDecoration: "none", color: "white" }}
              to="/user/physicsques"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsetPaper;
