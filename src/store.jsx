import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    courses: courseReducer,
    auth: authReducer,
  },
});

export default store;
