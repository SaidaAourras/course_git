import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get("http://localhost:3000/courses");
    console.log("Fetched courses:", response.data); // Log the response data
    return response.data;
  }
);

// Thunk for adding a course
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course) => {
    const response = await axios.post("http://localhost:3000/courses", course);
    return response.data;
  }
);

// Thunk for deleting a course
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id) => {
    await axios.delete(`http://localhost:3000/courses/${id}`);
    return id;
  }
);

// Thunk for updating a course
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course) => {
    const response = await axios.put(
      `http://localhost:3000/courses/${course.id}`,
      course
    );
    return response.data;
  }
);

// Thunk for adding a comment
export const addComment = createAsyncThunk(
  "courses/addComment",
  async ({ courseId, comment }) => {
    const response = await axios.post(
      `http://localhost:3000/courses/${courseId}/comments`,
      { comment }
    );
    return { courseId, comment: response.data.comment }; // Ensure correct return structure
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        // Convert IDs to numbers
        state.courses = action.payload.map((course) => ({
          ...course,
          id: Number(course.id), // Convert ID to number
          comments: course.comments || [], // Initialize comments if not present
        }));
        state.status = "succeeded";
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push({
          ...action.payload,
          id: Number(action.payload.id), // Ensure ID is a number
          comments: [], // Initialize comments as an empty array
        });
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload
        );
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(
          (course) => course.id === action.payload.id
        );
        if (index !== -1) {
          state.courses[index] = {
            ...action.payload,
            comments: state.courses[index].comments || [],
          };
        } else {
          console.error(
            `Course with ID ${action.payload.id} not found for update.`
          );
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { courseId, comment } = action.payload;
        const course = state.courses.find((course) => course.id === courseId);
        if (course) {
          course.comments.push(comment); // Push the comment object directly
        }
      });
  },
});

export default courseSlice.reducer;
