import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { notifyAdded } from "../iziNotify";

const AddUser = () => {
  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/serveraddstudents", {
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

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:3003/users", user);
      await axios.post("/register", user);

      notifyAdded();
      setTimeout(function () {
        window.location.reload(false);
      }, 1000);
    },
    [user]
  );

  const finish = () => {
    history.push("/vieweditstudents");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4 ">Add A Student</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg w-100"
              placeholder="Enter Student's Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg w-100"
              placeholder="Enter Students Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg w-100"
              placeholder="Enter Students Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-primary  w-25 mb-1 float-right">
            Add User
          </button>
          <button
            onClick={finish}
            type="button"
            className="btn btn-info btn-block"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
