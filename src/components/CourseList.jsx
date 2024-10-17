// src/components/CourseList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  deleteCourse,
  updateCourse,
} from "../features/CourseSlice";
import { Link } from "react-router-dom";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, status } = useSelector((state) => state.courses);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Courses</h2>
        {role === "admin" && (
          <Link to="/courses/add" className="btn btn-primary">
            Add Course
          </Link>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{course.title}</td>
              <td>
                <Link to={`/courses/${course.id}`} className="btn btn-info">
                  View Details
                </Link>
                {role === "admin" && (
                  <>
                    <Link
                      to={`/courses/${course.id}/edit`}
                      className="btn btn-warning mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
