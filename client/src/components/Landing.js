import React, { useEffect } from "react";
import "./CreateExams.css";
import { useForm } from "react-hook-form";
import { notifyLoginFailure, notifyLoginSuccess } from "./iziNotify";
import { Grid, Paper } from "@material-ui/core";
import { paperStyle } from "./extraStyling.js";
import "./Landing.css";
import { useHistory } from "react-router";

const Landing = () => {
  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/adminserver", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        history.push("/");
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      history.push("/");
    }
  };
  useEffect(() => {
    callAdminPage();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = async (formData) => {
    const { email, password } = formData;
    const res = await fetch("/loginserver", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status === 400 || !data) {
      notifyLoginFailure();
    } else {
      notifyLoginSuccess();
      setTimeout(function () {
        history.push("/");
      }, 2000);
    }
  };

  return (
    <div className="Landing">
      <Grid className=" container grid">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h4>Online Examination System Nepal</h4> <br />
            <h6>Enter your login credentials</h6>
          </Grid>
          <form method="post" name="myform" onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: "Enter your e-mail",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid e-mail address",
                },
              })}
            />

            {errors.email && (
              <p
                style={{ color: "red", background: "5px solid red" }}
                className="error"
              >
                {errors.email.message}
              </p>
            )}
            <label>Password</label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}
            <input type="submit" value="LOGIN" />
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Landing;
