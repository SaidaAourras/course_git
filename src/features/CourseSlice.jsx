import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching courses
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get('http://localhost:3000/courses');
  return response.data;
});

// Thunk for adding a course
export const addCourse = createAsyncThunk('courses/addCourse', async (course) => {
  const response = await axios.post('http://localhost:3000/courses', course);
  return response.data;
});

// Thunk for deleting a course
export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (id) => {
  await axios.delete(`http://localhost:3000/courses/${id}`);
  return id;
});

// Thunk for updating a course
export const updateCourse = createAsyncThunk('courses/updateCourse', async (course) => {
  const response = await axios.put(`http://localhost:3000/courses/${course.id}`, course);
  return response.data;
});

// Thunk for adding a comment
export const addComment = createAsyncThunk('courses/addComment', async ({ courseId, comment }) => {
  const response = await axios.post(`http://localhost:3000/courses/${courseId}/comments`, { comment });
  return { courseId, comment: response.data };
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    comments: {},  // Initialize comments as an object
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
        // Initialize comments for the new course
        state.comments[action.payload.id] = [];
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course.id !== action.payload);
        // Remove comments for the deleted course
        delete state.comments[action.payload];
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index === -1) {
          // If course doesn't exist, you might want to handle it (e.g., log an error)
          console.error(`Course with ID ${action.payload.id} not found for update.`);
        } else {
          // Update the existing course with new data
          state.courses[index] = action.payload;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { courseId, comment } = action.payload;
        if (!state.comments[courseId]) {
          state.comments[courseId] = []; // Initialize comments array if not present
        }
        state.comments[courseId].push(comment);
      });
  }
});

export default courseSlice.reducer;
