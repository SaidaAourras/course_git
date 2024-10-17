import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);

  console.log("Courses from Redux:", courses);

  const course = courses.find((course) => course.id === Number(id));

  return (
    <div className="container my-4">
      {course ? (
        <div className="card">
          <div className="card-header">
            <h2>{course.title}</h2>
          </div>
          <div className="card-body">
            <p className="card-text">{course.details}</p>
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="img-fluid rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}
          </div>

          <div className="my-4 mx-3">
            <h4>Comments</h4>
            <ul className="list-group">
              {course.comments.map((comment, index) => (
                <li key={index} className="list-group-item">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          Course not found.
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
