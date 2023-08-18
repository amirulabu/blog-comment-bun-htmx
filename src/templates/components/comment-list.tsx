import * as elements from "typed-html";

const CommentList = (props: { comments: Comment[] }) => {
  return (
    <div>
      {props.comments.map((comment) => (
        <div class="card mb-3">
          <div class="card-body">
            <p class="card-text">
              {comment.id}.{comment.body}
            </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {comment.email}
            </h6>
            <small class="text-muted">{comment.timestamp}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
