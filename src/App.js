import { Route, Switch } from "react-router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import Navbar from "./components/Navbar/Navbar";
import CreateExam from "./components/CreateExam";
import SetQuestions from "./components/SetQuestions";
import Landing from "./components/Landing";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import ViewEditStudents from "./components/pages/ViewEditStudents";
import NotFound from "./components/pages/NotFound";
import AddStudents from "./components/students/AddStudents";
import EditStudents from "./components/students/EditStudents";
import ViewStudents from "./components/students/ViewStudents";

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
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
