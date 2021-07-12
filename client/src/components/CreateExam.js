import React, { useEffect } from "react";
import "./CreateExams.css";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { notify } from "./iziNotify";

const initialState = {
  examName: "",
  examTime: "",
  examDate: "",
};

const SetQuestions = () => {
  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/servercreateexam", {
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

  const onSubmit = async (formData) => {
    await axios.post("servercreateexam", formData);
    notify();
    setTimeout(function () {
      history.push("/setquestions");
    }, 2000);

    // do whatever you need here, at this stage the form is validated yeah boii
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: initialState,
  });

  return (
    <div>
      <div className="container1">
        <div className="row1">
          <div className="card1">
            <div className="card-body1">
              <form
                method="POST"
                name="myform"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label>Name of the exam</label>
                <input
                  {...register("examName", {
                    required: true,
                    minLength: 3,
                    maxLength: 40,
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
                  defaultValue=""
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
