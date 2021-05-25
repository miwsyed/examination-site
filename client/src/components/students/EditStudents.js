import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { notifyUpdated } from "../iziNotify";

const EditStudents = () => {
  const { id } = useParams();

  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/servereditstudents", {
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
      await axios.put(`http://localhost:3003/users/${id}`, user);
      notifyUpdated();
      setTimeout(function () {
        history.push("/vieweditstudents");
      }, 3000);
    },
    [user]
  );

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4 ">Edit Student details</h2>
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

          <button className="btn btn-warning  w-25 mb-1 float-right">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudents;
