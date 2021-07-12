import { Route, Switch } from "react-router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import Navbar from "./components/Navbar/Navbar";
import CreateExam from "./components/CreateExam";
import SetQuestions from "./components/SetQuestions";
import ViewQuestion from "./components/ViewQuestion";
import Landing from "./components/Landing";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import ViewEditStudents from "./components/pages/ViewEditStudents";
import NotFound from "./components/pages/NotFound";
import AddStudents from "./components/students/AddStudents";
import EditStudents from "./components/students/EditStudents";
import ViewStudents from "./components/students/ViewStudents";
import UpcomingExaminations from "./components/UpcomingExaminations";
import ViewUpcomingExams from "./components/ViewUpcomingExams";
import EditUpcomingExams from "./components/EditUpcomingExams";
import EditQuestion from "./components/EditQuestion";
import Logout from "./components/Logout";
import ViewStudentExam from "./components/StudentPanel/ViewStudentExam";
import ViewStudentProfile from "./components/StudentPanel/ViewStudentProfile";
import GiveExam from "./components/StudentPanel/GiveExam";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Landing />
        </Route>

        <Route exact path="/">
          <Navbar />
          <AdminPage />
        </Route>
        <Route exact path="/createExam">
          <Navbar />
          <CreateExam />
        </Route>
        <Route exact path="/setquestions">
          <Navbar />
          <SetQuestions />
        </Route>
        <Route exact path="/vieweditstudents">
          <Navbar />
          <ViewEditStudents />
        </Route>
        <Route exact path="/addstudents">
          <Navbar />
          <AddStudents />
        </Route>
        <Route exact path="/editstudents/:id">
          <Navbar />
          <EditStudents />
        </Route>
        <Route exact path="/viewstudents/:id">
          <Navbar />
          <ViewStudents />
        </Route>
        <Route exact path="/upcomingexaminations">
          <Navbar />
          <UpcomingExaminations />
        </Route>
        <Route exact path="/viewupcomingexams">
          <Navbar />
          <ViewUpcomingExams />
        </Route>
        <Route exact path="/editupcomingexams/:id">
          <Navbar />
          <EditUpcomingExams />
        </Route>
        <Route exact path="/viewquestion/:id">
          <Navbar />
          <ViewQuestion />
        </Route>
        <Route exact path="/editquestion/:id">
          <Navbar />
          <EditQuestion />
        </Route>
        <Route exact path="/logout">
          <Navbar />
          <Logout />
        </Route>
        <Route exact path="/viewstudentexam">
          <Navbar />
          <ViewStudentExam />
        </Route>
        <Route exact path="/viewstudentprofile">
          <Navbar />
          <ViewStudentProfile />
        </Route>
        <Route exact path="/giveexam">
          <Navbar />
          <GiveExam />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
