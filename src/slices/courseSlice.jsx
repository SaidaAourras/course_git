import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch('/api/courses'); // Replace with your API
  return response.json();
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addCourse(state, action) {
      state.courses.push(action.payload);
    },
    deleteCourse(state, action) {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },
    updateCourse(state, action) {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    addComment(state, action) {
      const { courseId, comment } = action.payload;
      const course = state.courses.find(course => course.id === courseId);
      if (course) {
        course.comments.push(comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      });
  },
});

export const { addCourse, deleteCourse, updateCourse, addComment } = courseSlice.actions;
export default courseSlice.reducer;
