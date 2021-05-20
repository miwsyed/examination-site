import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditUpcomingExams = () => {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const resultQuestion = await axios.get(`http://localhost:3003/questions`);
    const resultExam = await axios.get(`http://localhost:3003/exams/${id}`);

    setQuestions(resultQuestion.data);
    setExam(resultExam.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/questions/${id}`);
    loadUsers();
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="py-4">
        <Link
          className="btn btn-outline-primary float-right mb-5"
          to="/setquestions"
        >
          Add Question
        </Link>
        <div className="container shadow w-25">Exam Name : {exam.examName}</div>
        <table className="table border shadow">
          <thead className="thead-light">
            <tr>
              <th scope="col">Q.No</th>
              <th scope="col">Question</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.question}</td>
                <td>
                  <Link
                    className="btn btn-primary mr-2"
                    to={`/viewquestion/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/editquestion/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditUpcomingExams;
