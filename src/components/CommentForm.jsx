import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../features/CourseSlice";

const CommentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim()) {
      dispatch(addComment({ courseId: Number(id), comment }));
      setComment("");
    }
  };

  return (
    <div className="my-4 w-75 mx-auto">
      <h4>Add a Comment</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            value={comment}
            onChange={handleChange}
            rows="3"
            placeholder="Write your comment here..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
