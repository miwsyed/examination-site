import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";

const UpcomingExaminations = () => {
  const { id } = useParams();
  const history = useHistory();

  const callAdminPage = async () => {
    try {
      const res = await fetch("/serverupcomingexaminations", {
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

  const [exams, setExams] = useState([]);

  useEffect(() => {
    loadExamName();
  }, []);

  const loadExamName = async () => {
    const Exam = await axios.get(`http://localhost:3003/exams`);
    setExams(Exam.data);
  };

  const goView = () => {
    history.push(`/viewupcomingexams/${id}`);
  };
  const goEdit = () => {
    history.push(`/editupcomingexams/${id}`);
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadExamName();
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="py-4">
        <table className="table border shadow">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Exam Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody key={id}>
            {exams.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.examName}</td>
                <td>{user.examDate}</td>
                <td>{user.examTime}</td>

                <td>
                  <Link
                    className="btn btn-primary mr-2"
                    to={`/viewupcomingexams/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/editupcomingexams/${user.id}`}
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

export default UpcomingExaminations;
