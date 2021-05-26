import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../SetQuestions.css";
import { notifyAddedQuestion } from "../iziNotify";

// I am not sure what count is, so I keep it here

// This is initial form state that will be used by useForm() hook,
// see defaultValues
const initialState = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  answerOption: "",
};

const GiveExam = () => {
  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/serversetquestions", {
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

  useEffect(() => {
    loadUser();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: initialState,
  });

  const [exam, setExam] = useState({});
  const [examNameCurrent, setExamNameCurrent] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState({});

  useEffect(() => {
    setActiveQuestion(exam[activeQuestionIndex]);
  }, [activeQuestionIndex, exam]);

  const onSubmit = async (formData) => {
    await axios.post("http://localhost:3003/answers", formData);
    notifyAddedQuestion();
    setTimeout(function () {
      window.location.reload(false);
    }, 2000);

    // do whatever you need here, at this stage the form is validated
  };

  const loadUser = async () => {
    const questions = await axios.get(`http://localhost:3003/questions`);
    const Exam = await axios.get(`http://localhost:3003/exams`);
    setExam(questions.data);
    setExamNameCurrent(Exam.data[0]);
    setTimeout(() => {
      setActiveQuestionIndex(1);
    }, 500);
    setTimeout(() => {
      setActiveQuestionIndex(0);
    }, 600);
  };
  //console.log(exam[0].question);
  const totalQuestion = exam.length;
  const examNames = examNameCurrent.examName;
  const done = () => {
    history.push("/");
  };

  return (
    <div>
      <div className="container shadow-lg w-50">
        <div className="row2">
          <div className="card2">
            <div className="card-body2">
              <label
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Exam Name : {examNames}
              </label>
              {activeQuestion && (
                <form
                  style={{ marginTop: "0px auto" }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label style={{ float: "right" }}>
                      Total Questions : {totalQuestion}
                    </label>
                    <label style={{ float: "left" }}>Question</label>
                    <input
                      type="text"
                      value={activeQuestion.question}
                      style={{ width: "100%" }}
                      {...register("question", {
                        required: true,
                      })}
                    />
                  </div>

                  <div className="option">
                    <label style={{ fontSize: "15px" }}>A</label>

                    <input
                      type="text"
                      value={activeQuestion.optionA}
                      className="mcqOptions"
                      // register name matches your state object
                      {...register("optionA", {
                        required: true,
                      })}
                    />
                    <input
                      type="radio"
                      value="optionA"
                      className="radio"
                      id="Aid"
                      {...register("answerOption", {
                        required: true,
                      })}
                    />
                  </div>

                  <div className="option">
                    <label style={{ fontSize: "15px" }}>B</label>

                    <input
                      type="text"
                      value={activeQuestion.optionB}
                      className="mcqOptions"
                      // register name matches your state object
                      {...register("optionB", {
                        required: true,
                      })}
                    />
                    <input
                      type="radio"
                      value="optionB"
                      className="radio"
                      id="Bid"
                      {...register("answerOption", {
                        required: true,
                      })}
                    />
                  </div>

                  <div className="option">
                    <label style={{ fontSize: "15px" }}>C</label>

                    <input
                      type="text"
                      value={activeQuestion.optionC}
                      className="mcqOptions"
                      // register name matches your state object
                      {...register("optionC", {
                        required: true,
                      })}
                    />
                    <input
                      type="radio"
                      value="optionC"
                      className="radio"
                      id="Cid"
                      {...register("answerOption", {
                        required: true,
                      })}
                    />
                  </div>

                  <div className="option">
                    <label style={{ fontSize: "15px" }}>D</label>
                    <input
                      type="text"
                      value={activeQuestion.optionD}
                      className="mcqOptions"
                      // register name matches your state object
                      {...register("optionD", {
                        required: true,
                      })}
                    />
                    <input
                      type="radio"
                      value="optionD"
                      className="radio"
                      id="Did"
                      {...register("answerOption", {
                        required: true,
                      })}
                    />
                  </div>

                  {errors?.answerOption?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Please Choose an Answer
                    </p>
                  )}

                  <input
                    className="next"
                    type="submit"
                    value="next"
                    onClick={() =>
                      setActiveQuestionIndex(activeQuestionIndex + 1)
                    }
                  />

                  <input onClick={done} type="button" value="Finish And Exit" />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveExam;
