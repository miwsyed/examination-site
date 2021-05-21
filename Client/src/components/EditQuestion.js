import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "../components/SetQuestions.css";
import { notifyUpdatedQuestion } from "./iziNotify";
import EditQuestionForm from "./EditQuestionForm";

// ================COMPONENT WITH DATA BELOW=========================

const EditQuestion = () => {
  const { id } = useParams();
  const history = useHistory();

  const [questionData, setQuestionData] = useState(null);
  const [examData, setExam] = useState(null);

  useEffect(() => {
    // you can define loadUser directly in useEffect
    const loadData = async () => {
      // all 3 requests do not depend on each other, use Promise.all to
      // send 3 requests in parallel
      const [questionData, totalQuestions, Exam] = await Promise.all([
        axios.get(`http://localhost:3003/questions/${id}`),
        axios.get(`http://localhost:3003/questions`),
        axios.get(`http://localhost:3003/exams`),
      ]);

      setExam({
        currentExamName: Exam.data[0].examName,
        totalQuestions: Object.keys(totalQuestions.data).length,
      });
      setQuestionData(questionData.data);
    };

    // call defined function
    loadData();
  }, [id]); // <-- add id to array of dependencies because it's used inside useEffect

  const onSubmit = useCallback(
    async (formData) => {
      await axios.put(`http://localhost:3003/questions/${id}`, formData);
      notifyUpdatedQuestion();
      setTimeout(function () {
        history.push("/editupcomingexams/1");
      }, 3000);
    },
    [id, history]
  );

  // extract logic in a function to make the markup more clean
  const renderExamData = () => {
    if (examData) {
      // exam data is defined
      return (
        <div>
          <div>Exam Name : {examData.currentExamName}</div>
          <div>Total Questions : {examData.totalQuestions}</div>
        </div>
      );
    }

    // when examData is not defined, render this by default
    return <div>Loading exam data...</div>;
  };

  const renderQuestionEditor = () => {
    if (questionData) {
      // question data is defined

      return (
        <div>
          <EditQuestionForm
            onSubmit={onSubmit}
            initialFormState={questionData}
          />
        </div>
      );
    }

    return <div>Loading question data</div>;
  };

  return (
    <div>
      <div className="container shadow-lg w-50">
        <div className="row2">
          <div className="card2">
            <div className="card-body2">
              {renderExamData()}
              {renderQuestionEditor()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
