import React, { useEffect, useCallback, useState } from "react";
import "./SetQuestions.css";
import { useForm } from "react-hook-form";
import $ from "jquery";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { notifyAdded } from "../components/iziNotify";

const SetQuestions = () => {
  let history = useHistory();
  const [mcq, setmcq] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    Aid: "",
    Bid: "",
    Cid: "",
    Did: "",
  });
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    Aid,
    Bid,
    Cid,
    Did,
  } = mcq;

  const onInputChange = (e) => {
    setmcq({ ...mcq, [e.target.name]: e.target.value });
  };

  const onSubmit = useCallback(
    async (e) => {
      await axios.post("http://localhost:3003/questions", mcq);
      notifyAdded();
      // setTimeout(function () {
      //   window.location.reload(false);
      // }, 1000);
      console.log(mcq);
    },
    [mcq]
  );

  useEffect(() => {
    $("input:checkbox").on("click", function () {
      var $box = $(this);
      if ($box.is(":checked")) {
        var group = "input:checkbox[name='" + $box.attr("name") + "']";

        $(group).prop("checked", false);
        $box.prop("checked", true);
      } else {
        $box.prop("checked", false);
      }
    });
  }, []);

  const count = 3;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  return (
    <div>
      <div className="container2">
        <div className="row2">
          <div className="card2">
            <div className="card-body2">
              <form
                method="post"
                name="myform"
                onSubmit={handleSubmit((e) => onSubmit(e))}
              >
                <div style={{ marginBottom: "10px" }}>
                  <span>Questions set : {count}</span>
                  <label>Question</label>
                  <input
                    name="question"
                    value={question}
                    {...register("question", {
                      required: true,
                      minLength: 10,
                      maxLength: 150,
                    })}
                    onChange={(e) => onInputChange(e)}
                  />
                  {errors?.question?.type === "required" && (
                    <p style={{ margin: "0px", padding: "0px" }}>
                      This field is required
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
                    className="mcqOptions"
                    name="optionA"
                    value={optionA}
                    {...register("optionA", {
                      required: true,
                      minLength: 4,
                      maxLength: 60,
                    })}
                    onChange={(e) => onInputChange(e)}
                  />
                  <input
                    type="checkbox"
                    className="radio"
                    id="Aid"
                    name="checky"
                    value={Aid}
                    onChange={(e) => onInputChange(e)}
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
                    className="mcqOptions"
                    value={optionB}
                    name="optionB"
                    type="text"
                    {...register("optionB", {
                      required: true,
                      minLength: 4,
                      maxLength: 60,
                    })}
                    onChange={(e) => onInputChange(e)}
                  />
                  <input
                    type="checkbox"
                    className="radio"
                    id="Bid"
                    name="checky"
                    value={Bid}
                    onChange={(e) => onInputChange(e)}
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
                    className="mcqOptions"
                    name="optionC"
                    value={optionC}
                    type="text"
                    {...register("optionC", {
                      required: true,
                      minLength: 4,
                      maxLength: 60,
                    })}
                    onChange={(e) => onInputChange(e)}
                  />
                  <input
                    type="checkbox"
                    className="radio"
                    id="Cid"
                    name="checky"
                    value={Cid}
                    onChange={(e) => onInputChange(e)}
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
                    className="mcqOptions"
                    name="optionD"
                    value={optionD}
                    type="text"
                    {...register("optionD", {
                      required: true,
                      minLength: 4,
                      maxLength: 60,
                    })}
                    onChange={(e) => onInputChange(e)}
                  />
                  <input
                    type="checkbox"
                    className="radio"
                    id="Did"
                    name="checky"
                    value={Did}
                    onChange={(e) => onInputChange(e)}
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
