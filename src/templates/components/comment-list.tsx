import * as elements from "typed-html";

const CommentList = (props: {
  comments: { email: string; body: string }[];
}) => {
  return (
    <div>
      <ul class="list-group">
        {props.comments.map((comment) => (
          <li class="list-group-item">
            {comment.email} - {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
