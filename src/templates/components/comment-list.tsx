import * as elements from "typed-html";
import CommentItem from "./comment-item";

const CommentList = (props: {
  comments: { id: number; email: string; body: string }[];
}) => {
  return (
    <div id="comments-list">
      <button
        class="btn btn-primary mb-3 mt-5"
        hx-get="/h/comments"
        hx-trigger="click, my-custom-event from:body"
        hx-target="#comments-list"
      >
        Reload comments
      </button>
      <ul class="list-group">
        {props.comments.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
