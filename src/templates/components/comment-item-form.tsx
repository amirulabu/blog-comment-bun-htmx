import * as elements from "typed-html";

const CommentItemForm = (props: { comment: Comment }) => {
  return (
    <div class="card mb-3" hx-target="this" hx-swap="outerHTML">
      <div class="card-body">
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <form>
              <input
                type="hidden"
                class="form-control"
                name="id"
                value={String(props.comment.id)}
              />
              <input
                type="text"
                class="form-control"
                name="body"
                value={props.comment.body}
              />
              <button
                class="btn btn-primary btn-small"
                hx-put={`/h/comments/${props.comment.id}`}
              >
                Submit
              </button>
              <button
                class="btn btn-warning btn-small"
                hx-get={`/h/comments/${props.comment.id}/item`}
              >
                Cancel
              </button>
              <button
                class="btn btn-danger btn-small"
                hx-delete={`/h/comments/${props.comment.id}`}
              >
                Delete
              </button>
            </form>
          </div>
        </div>

        {/* <button class="btn btn-warning btn-small">Cancel</button>
<button class="btn btn-danger btn-small">Delete</button> */}
      </div>
    </div>
  );
};

export default CommentItemForm;
