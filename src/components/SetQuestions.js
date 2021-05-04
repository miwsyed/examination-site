import React from "react";
import "./SetQuestions.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

const SetQuestions = () => {
  const count = 3;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="container2">
        <div className="row2">
          <div className="card2">
            <div className="card-body2">
              <form
                method="post"
                name="myform"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div style={{ marginBottom: "10px" }}>
                  <span>Questions set : {0}</span>
                  <label>Question</label>
                  <input
                    id="question"
                    {...register("setQuestion", {
                      required: true,
                      minLength: 10,
                      maxLength: 150,
                    })}
                  />
                  {errors?.setQuestion?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.setQuestion?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Question name cannot exceed 150 characters
                    </p>
                  )}
                </div>

                <div className="option">
                  <label style={{ fontSize: "15px" }}>A</label>

                  <input
                    type="text"
                    className="mcqOptions"
                    id="option1"
                    {...register("option1", {
                      required: true,
                      minLength: 4,
                      maxLength: 40,
                    })}
                  />
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />

                  {errors?.option1?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.option1?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Exam name cannot exceed 20 characters
                    </p>
                  )}
                </div>

                <div className="option">
                  <label style={{ fontSize: "15px" }}>B</label>

                  <input
                    className="mcqOptions"
                    id="option2"
                    type="text"
                    {...register("option2", {
                      required: true,
                      minLength: 4,
                      maxLength: 40,
                    })}
                  />
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />
                  {errors?.option2?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.option2?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Exam name cannot exceed 20 characters
                    </p>
                  )}
                </div>

                <div className="option">
                  <label style={{ fontSize: "15px" }}>C</label>

                  <input
                    className="mcqOptions"
                    id="option3"
                    type="text"
                    {...register("option3", {
                      required: true,
                      minLength: 4,
                      maxLength: 40,
                    })}
                  />
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />

                  {errors?.option3?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.option3?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Exam name cannot exceed 20 characters
                    </p>
                  )}
                </div>

                <div className="option">
                  <label style={{ fontSize: "15px" }}>D</label>
                  <input
                    className="mcqOptions"
                    id="option4"
                    type="text"
                    {...register("option4", {
                      required: true,
                      minLength: 4,
                      maxLength: 40,
                    })}
                  />
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />
                  {errors?.option4?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
                    </p>
                  )}
                  {errors?.option4?.type === "maxLength" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      Exam name cannot exceed 20 characters
                    </p>
                  )}
                </div>

                <input className="next" type="submit" value="next" />

                <input type="button" value="Save" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetQuestions;
