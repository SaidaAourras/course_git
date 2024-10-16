import React from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../slices/courseSlice';
import CommentForm from './CommentForm';

const CourseDetails = ({ course }) => {
  const dispatch = useDispatch();

  const handleAddComment = (comment) => {
    dispatch(addComment({ courseId: course.id, comment }));
  };

  return (
    <div className="course-details">
      <h3>{course.title}</h3>
      <img src={course.image} alt={course.title} />
      <p>{course.details}</p>
      <h4>Comments:</h4>
      <ul>
        {course.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
};

export default CourseDetails;
