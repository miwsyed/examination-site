import { Route, Switch } from "react-router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import Navbar from "./components/Navbar/Navbar";
import CreateExam from "./components/CreateExam";
import SetQuestions from "./components/SetQuestions";
import Landing from "./components/Landing";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import ViewEditStudents from "./components/ViewEditStudents";
import NotFound from "./components/pages/NotFound";

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
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
