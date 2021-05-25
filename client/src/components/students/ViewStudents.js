import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const ViewStudents = () => {
  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/serverviewstudents/:id", {
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

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = useCallback(async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
  }, [user]);

  return (
    <div className="container shadow-lg py-4">
      <Link className="btn btn-primary" to="/vieweditstudents">
        back
      </Link>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Student Name: {user.name}</li>
        <li className="list-group-item">Student email: {user.email}</li>
        <li className="list-group-item">Student Password: {user.password}</li>
      </ul>
    </div>
  );
};

export default memo(ViewStudents);
