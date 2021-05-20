import { Grid, Paper } from "@material-ui/core";
import React from "react";
// import { notify2 } from "./iziNotify.js";
import { paperStyle } from "./extraStyling.js";
// import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Landing.css";

const Landing = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  // const history = useHistory();

  const onSubmit = () => {
    // if (values.player1 !== values.player2) {
    //   setPlayers({ player1: values.player1, player2: values.player2 });
    //   history.push('/game');
    // }
    // else {
    //   { notify2(); }
    //   history.push('/');
    // }
  };

  return (
    <div className="Landing">
      <Grid className="grid">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h4>Online Exam Nepal</h4> <br />
            <h6>Enter your login credentials</h6>
          </Grid>
          <form
            method="post"
            name="myformLanding"
            onSubmit={handleSubmit(onSubmit)}
          >
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
