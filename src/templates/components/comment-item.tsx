import * as elements from "typed-html";

import CommentEditForm from "./comment-edit-form";

const CommentItem = (props: {
  comment: { id: number; email: string; body: string };
}) => {
  const comment = props.comment;
  return (
    <li class="list-group-item" id={`comment-item-${comment.id}`}>
      {comment.id} - {comment.email} - {comment.body}
      <a
        href="#"
        class="btn btn-primary btn-sm"
        hx-get={`/h/comments/edit/${comment.id}`}
        hx-target={`#comment-item-${comment.id}`}
        hx-swap="outerHTML"
      >
        Edit
      </a>
      {/* <CommentEditForm isError={false} value={comment.body} id="id" /> */}
    </li>
  );
};

export default CommentItem;
