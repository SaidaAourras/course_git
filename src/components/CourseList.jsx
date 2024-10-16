import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../slices/courseSlice';
import CourseDetails from './CourseDetails';

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const status = useSelector(state => state.courses.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Course List</h2>
      {courses.map(course => (
        <CourseDetails key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
