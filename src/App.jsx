// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseDetails from "./components/CourseDetails";
import CourseForm from "./components/CourseForm";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import CommentForm from "./components/CommentForm";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/add" element={<CourseForm />} />
          <Route path="/courses/:id/edit" element={<CourseForm />} />
          <Route path="/comment/:id" element={<CommentForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
