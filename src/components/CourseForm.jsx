import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, updateCourse } from "../features/CourseSlice";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const CourseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const courses = useSelector((state) => state.courses.courses);
  const selectedCourse = courses.find((course) => course.id === parseInt(id));

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title);
      setCategory(selectedCourse.category);
    } else {
      setTitle("");
      setCategory("");
    }
  }, [selectedCourse]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      id: selectedCourse ? selectedCourse.id : uuid(),
      title,
      category,
      image: image ? URL.createObjectURL(image) : undefined,
    };

    dispatch(selectedCourse ? updateCourse(courseData) : addCourse(courseData));
    navigate("/courses");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedCourse ? "Update Course" : "Add Course"}
      </button>
    </form>
  );
};

export default CourseForm;
