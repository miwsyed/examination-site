import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import "./ExamPaper.css";
import { notify2 } from "./iziNotify";

const ExamsetPaper = () => {
  const [examData, setExamData] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const loadUsers = async () => {
      const totalExams = await axios.get(`http://localhost:3003/exams`);

      setExamData({
        totalQuestions: Object.keys(totalExams.data).length,
      });
    };

    loadUsers();
  }, []);
  const gotoExam = () => {
    if (examData.totalQuestions === 0) {
      history.push("/createexam");
    } else {
      notify2();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <label>Click below to set your exam details and date</label>

            <Link
              className="btn"
              style={{ textDecoration: "none", color: "white" }}
              onClick={gotoExam}
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
              to="/upcomingexaminations"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsetPaper; // done boii
