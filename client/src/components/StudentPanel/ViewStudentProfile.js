import React, { memo, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const ViewStudentProfile = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
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

      const data = await res.json();
      setUserData(data);

      if (!res.status === 200) {
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

  return (
    <div className="container w-50 shadow-lg py-4">
      <Link className="btn btn-primary" to="/">
        back
      </Link>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Student Name: {userData.name}</li>
        <li className="list-group-item">Student email: {userData.email}</li>
      </ul>
    </div>
  );
};

export default memo(ViewStudentProfile);
