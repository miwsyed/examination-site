import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const ViewEditStudents = () => {
  const [users, setUser] = useState([]);
  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/servervieweditstudents", {
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

    const loadUsers = async () => {
      const result = await axios.get("http://localhost:3003/users");
      setUser(result.data);
    };

    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:3003/users/${id}`);
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="py-4">
        <Link
          className="btn btn-outline-primary float-right mb-5"
          to="/addstudents"
        >
          Add Student
        </Link>

        <table className="table border shadow">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>

                <td>
                  <Link
                    className="btn btn-primary mr-2"
                    to={`/viewstudents/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/editstudents/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEditStudents;
