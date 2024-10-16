// src/components/CourseDetails.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams();
  const {courses} = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === parseInt(id));
  console.log(course)


  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header">
          <h2>{course.title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">{course.description}</p>
          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="img-fluid rounded"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          )}
        </div>
      </div>

      <div className="my-4">
        <h4>Comments</h4>
        <ul className="list-group">
          {course.comments.map((comment,index) => (
            <li key={index} className="list-group-item">
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
