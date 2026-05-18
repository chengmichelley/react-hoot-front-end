import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as hootService from "../../services/hootService";
import styles from "./CommentForm.module.css";
import Icon from "../Icon/Icon";

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: "" });
  const { hootId, commentId } = useParams();
  console.log(hootId, commentId);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (hootId && commentId) {
      await hootService.updateComment(hootId, commentId, formData);
      navigate(`/hoots/${hootId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: "" });
  };

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);

      const foundComment = hootData.comments.find(
        (comment) => comment._id === commentId,
      );

      if (foundComment) {
        setFormData({ text: foundComment.text });
      }
    };
    if (hootId && commentId) fetchHoot();
  }, [hootId, commentId]); 

    if (hootId && commentId) 
    return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <label htmlFor='text-input'>Your comment:</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="text-input">Your comment:</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <button type="submit">
          <Icon category="Create" />
        </button>
      </form>
    );
};

export default CommentForm;
