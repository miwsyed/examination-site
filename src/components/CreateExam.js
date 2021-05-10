import React from "react";
import "./CreateExams.css";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const SetQuestions = () => {
  const history = useHistory();

  const onSubmit = (data) => {
    history.push("/setQuestions");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  return (
    <div>
      <div className="container1">
        <div className="row1">
          <div className="card1">
            <div className="card-body1">
              <form
                method="post"
                name="myform"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label>Name of the exam</label>
                <input
                  {...register("examName", {
                    required: true,
                    minLength: 10,
                    maxLength: 20,
                  })}
                />
                {errors?.examName?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.firstName?.type === "maxLength" && (
                  <p>Exam name cannot exceed 20 characters</p>
                )}
                <label>Exam Time</label>
                <input
                  type="time"
                  id="examTime"
                  name="examTime"
                  min="09:00"
                  max="18:00"
                  {...register("examTime", { required: true })}
                />
                {errors?.examTime?.type === "required" && (
                  <p>This field is required</p>
                )}
                <label>Exam Date</label>
                <input
                  type="date"
                  id="examDate"
                  name="examDate"
                  {...register("examDate", { required: true })}
                />
                {errors?.examDate?.type === "required" && (
                  <p>This field is required</p>
                )}

                <input type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetQuestions;
