import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { notifyLogOut } from "./iziNotify";
//yeah boii
const Logout = () => {
  notifyLogOut();
  const history = useHistory();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        history.push("/login", { replace: true });
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <div>Log out Page</div>;
};

export default Logout;
