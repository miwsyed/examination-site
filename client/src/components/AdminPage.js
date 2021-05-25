import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ExamsetPaper from "./ExamsetPaper";
import StudentPanel from "./StudentPanel/StudentPanel";

const AdminPage = () => {
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

      console.log(userData.email);

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
    <div style={{ fontFamily: "cairo,sansSerif" }}>
      <div>
        <h2 style={{ textAlign: "center" }} className="container shadow w-25">
          Welcome {userData.email === "laraib@gmail.com" ? "Admin" : "Student"}
        </h2>
      </div>
      {userData.email === "laraib@gmail.com" ? (
        <ExamsetPaper />
      ) : (
        <StudentPanel />
      )}
    </div>
  );
};

export default AdminPage;
