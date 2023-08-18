import * as elements from "typed-html";

const CommentItem = (props: { comment: Comment }) => {
  const { comment } = props;

  return (
    <div class="card mb-3" hx-target="this" hx-swap="outerHTML">
      <div class="card-body">
        <p class="card-text">
          {comment.id}.{comment.body}
        </p>
        <h6 class="card-subtitle mb-2 text-body-secondary">{comment.email}</h6>
        <small class="text-muted">{comment.timestamp}</small>
        <span style="display:hidden">{comment.ipaddr}</span>
        <button
          class="btn btn-primary btn-small"
          hx-get={`/h/comments/${comment.id}`}
        >
          Edit
        </button>
        {/* <button class="btn btn-warning btn-small">Cancel</button>
    <button class="btn btn-danger btn-small">Delete</button> */}
      </div>
    </div>
  );
};

export default CommentItem;
