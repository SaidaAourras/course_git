// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/AuthSlice';
import coursesReducer from './features/CourseSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer, 
  },
});

export default store;
