import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

const ViewUpcomingExams = () => {
  const { id } = useParams();

  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/serverviewupcomingexams/:id", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 200) {
        history.push("/login");
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      history.push("/login");
    }
  };

  useEffect(() => {
    callAdminPage();
  }, []);

  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadExam();
  }, []);

  const loadExam = useCallback(async () => {
    const result = await axios.get(`http://localhost:3003/exams/${id}`);
    const question = await axios.get(`http://localhost:3003/questions`);
    setQuestions(question.data);

    window.totalQuestion = Object.keys(question.data).length;

    setExam(result.data);
  }, [exam]);

  return (
    <div>
      <div className="container shadow-lg py-4 w-50">
        <Link className="btn btn-primary " to="/upcomingexaminations">
          back
        </Link>
        <hr />
        <ul className="list-group ">
          <li className="list-group-item">Exam Name: {exam.examName}</li>
          <li className="list-group-item">Exam Time : {exam.examTime}</li>
          <li className="list-group-item">Exam Date: {exam.examDate}</li>
          <li className="list-group-item">
            Total Questions Set: {window.totalQuestion}
          </li>
        </ul>
      </div>
      <tbody
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className="container"
      >
        {questions.map((id, index) => (
          <tr style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <th scope="row">
                <label>Question No : {index + 1}</label>
              </th>
            </div>
            <td>
              <div className="container shadow-lg mr-5">
                <label style={{ fontWeight: "bold" }}>
                  Question : {id.question}
                </label>
                <label>optionA : {id.optionA}</label>
                <label>optionB : {id.optionB}</label>
                <label>optionC : {id.optionC}</label>
                <label>optionD : {id.optionD}</label>
                <label style={{ fontWeight: "bold" }}>
                  answer : {id.answerOption}
                </label>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default ViewUpcomingExams;
//yeah boii
