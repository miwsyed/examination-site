import React from "react";
import { useForm } from "react-hook-form";
const QuestionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form>
        <label>Name of the exam</label>
        <input
          {...register("firstName", {
            required: true,
            minLength: 10,
            maxLength: 20,
          })}
        />
        {errors?.firstName?.type === "required" && (
          <p>This field is required</p>
        )}
        {errors?.firstName?.type === "maxLength" && (
          <p>Exam name cannot exceed 20 characters</p>
        )}
        <label>Exam Duration</label>
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        {errors?.lastName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <label>Exam Date</label>a
        <input {...register("age", { min: 18, max: 99 })} />
        {errors.age && (
          <p>You Must be older then 18 and younger then 99 years old</p>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default QuestionForm;
