
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import EmployeeList from "./components/EmployeeList";
const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
      <Router>
          <Routes>
              <Route path="/" element={isAuth ? <EmployeeList /> : <Login setAuth={setIsAuth} />} />
              {/* <Route path="/list"  element = {<EmployeeList />}/> */}
          </Routes>
      </Router>
  );
};


export default App;
