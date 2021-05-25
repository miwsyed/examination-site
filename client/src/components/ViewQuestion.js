import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const ViewQuestion = () => {
  const [question, setQuestion] = useState({});

  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/serverviewquestion/:id", {
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

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = useCallback(async () => {
    const result = await axios.get(
      `http://localhost:5000/api/database/questions/${id}`
    );
    setQuestion(result.data);
  }, [question]);

  return (
    <div className="container shadow-lg py-4">
      <Link
        className="btn btn-primary"
        onClick={() => {
          history.push(`/editupcomingexams/1`);
        }}
      >
        back
      </Link>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Question: {question.question}</li>
        <li className="list-group-item">Option A: {question.optionA}</li>
        <li className="list-group-item">Option B: {question.optionB}</li>
        <li className="list-group-item">Option C: {question.optionC}</li>
        <li className="list-group-item">Option D: {question.optionD}</li>
        <li className="list-group-item">
          Answer Option: {question.answerOption}
        </li>
      </ul>
    </div>
  );
};

export default memo(ViewQuestion);
