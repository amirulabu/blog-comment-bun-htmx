import * as elements from "typed-html";
import CommentItem from "./comment-item";

const CommentList = (props: { comments: Comment[] }) => {
  return (
    <div hx-target="this">
      <button
        hx-get="/h/comments"
        hx-trigger="new-comment-added from:body"
        class="btn btn-primary"
      >
        Reload comments
      </button>
      {props.comments.map((comment) => (
        <CommentItem comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
