import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../components/SetQuestions.css";
import { notifyAddedQuestion } from "./iziNotify";

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

const SetQuestions = () => {
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

  const onSubmit = async (formData) => {
    await axios.post("http://localhost:3003/questions", formData);
    notifyAddedQuestion();
    setTimeout(function () {
      window.location.reload(false);
    }, 2000);

    // do whatever you need here, at this stage the form is validated
  };

  const loadUser = async () => {
    const totalQuestions = await axios.get(`http://localhost:3003/questions`);
    const Exam = await axios.get(`http://localhost:3003/exams`);

    window.currentExamName = Exam.data[0].examName;
    window.totalQuestion = Object.keys(totalQuestions.data).length;
  };

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
                Exam Name : {window.currentExamName}
              </label>
              <form
                style={{ marginTop: "0px auto" }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label style={{ float: "right" }}>
                    Questions set : {window.totalQuestion}
                  </label>
                  <label style={{ float: "left" }}>Question</label>
                  <input
                    type="text"
                    defaultValue=""
                    style={{ width: "100%" }}
                    {...register("question", {
                      required: true,
                      minLength: 10,
                      maxLength: 150,
                    })}
                  />
                  {errors?.question?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.question?.type === "minLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Question name must be more than 10 characters
                    </p>
                  )}
                  {errors?.question?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Question name cannot exceed 150 characters
                    </p>
                  )}
                </div>

                <div className="option">
                  <label style={{ fontSize: "15px" }}>A</label>

                  <input
                    type="text"
                    defaultValue=""
                    className="mcqOptions"
                    // register name matches your state object
                    {...register("optionA", {
                      required: true,
                      minLength: 4,
                      maxLength: 60,
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

                  {errors?.optionA?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.optionA?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Answer cannot exceeed 60 characters
                    </p>
                  )}
                </div>

                <div className="option">
                  <label style={{ fontSize: "15px" }}>B</label>

                  <input
                    type="text"
                    defaultValue=""
                    className="mcqOptions"
                    // register name matches your state object
                    {...register("optionB", {
                      required: true,
                      minLength: 4,
                      maxLength: 60,
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
                  {errors?.optionB?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.optionB?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Answer cannot exceeed 60 characters
                    </p>
                  )}
                </div>

                <div className="option">
                  <label style={{ fontSize: "15px" }}>C</label>

                  <input
                    type="text"
                    defaultValue=""
                    className="mcqOptions"
                    // register name matches your state object
                    {...register("optionC", {
                      required: true,
                      minLength: 4,
                      maxLength: 60,
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

                  {errors?.optionC?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.optionC?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Answer cannot exceeed 60 characters
                    </p>
                  )}
                </div>

                <div className="option">
                  <label style={{ fontSize: "15px" }}>D</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="mcqOptions"
                    // register name matches your state object
                    {...register("optionD", {
                      required: true,
                      minLength: 4,
                      maxLength: 60,
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
                  {errors?.optionD?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.optionD?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Answer cannot exceeed 60 characters
                    </p>
                  )}
                </div>

                {errors?.answerOption?.type === "required" && (
                  <p style={{ margin: "0px", padding: "0px" }}>
                    Select which option is the correct answer
                  </p>
                )}

                <input className="next" type="submit" value="next" />

                <input onClick={done} type="button" value="Save" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//yeah boii
export default SetQuestions;
