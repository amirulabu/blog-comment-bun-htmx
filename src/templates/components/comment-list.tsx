import * as elements from "typed-html";

const CommentList = (props: {
  comments: { email: string; body: string }[];
}) => {
  return (
    <div>
      {props.comments.map((comment) => (
        <div class="card mb-3">
          <div class="card-body">
            <p class="card-text"> {comment.body} </p>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {comment.email}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
