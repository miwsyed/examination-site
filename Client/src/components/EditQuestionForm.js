import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const defaultFormState = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  answerOption: "",
};

// 1) initialFormState prop -> if not passed, use defaultFormState
// 2) onSubmit prop -> will be defined in the parent component
const EditQuestionForm = ({
  initialFormState = defaultFormState,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    // PASS initialFormState to the hook
    defaultValues: initialFormState,
  });

  const history = useHistory();

  return (
    <form style={{ marginTop: "0px auto" }} onSubmit={handleSubmit(onSubmit)}>
      <div>
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

      <input className="next" type="submit" value="Update" />
      <input
        type="button"
        value="Back"
        onClick={() => history.push("/editupcomingexams/1")}
      />
    </form>
  );
};

export default EditQuestionForm;
