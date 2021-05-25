import React, { memo, useCallback } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { Link, NavLink } from "react-router-dom";
import { NavbarText } from "reactstrap";
import logo from "../../assets/logo.png";
import useStyles from "./styles";
import { notifyLogOut } from "../iziNotify";

const Navbar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          {/* typography for logo and our brand */}
          <NavbarText>
            <Link
              to="/"
              className="d-flex align-items-center"
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="h6"
                className={classes.title}
                color="inherit"
              >
                <img
                  src={logo}
                  alt="SmartShopping"
                  height="25px"
                  className={classes.image}
                />
                Online Examination System
              </Typography>
            </Link>
          </NavbarText>
          <div className={classes.grow} />
          Sign Out
          <NavLink to="/logout" className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge color="secondary">
                <ExitToAppRoundedIcon />
              </Badge>
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default memo(Navbar);
