import * as elements from "typed-html";

const CommentEditForm = (props: {
  isError: boolean;
  value: string;
  id: number;
}) => {
  return (
    <li
      class="list-group-item"
      id={`comment-item-${props.id}`}
      hx-target="this"
      hx-swap="outerHTML"
    >
      <form
        hx-put={`/h/comments/${props.id}`}
        class="row align-middle"
        id="comment-edit-form"
      >
        <div class="col-auto">
          <input
            class={`form-control form-control-sm ${
              props.isError ? "is-invalid" : ""
            }}`}
            type="text"
            name="body"
            value={props.value}
          />
        </div>
        <div class="col-auto align-self-center">
          <button
            class="btn btn-primary btn-sm"
            hx-put={`/h/comments/${props.id}`}
          >
            Submit
          </button>
          <button
            class="btn btn-warning btn-sm"
            hx-get={`/h/comments/${props.id}`}
          >
            Cancel
          </button>
          <button
            class="btn btn-danger btn-sm"
            hx-delete={`/h/comments/${props.id}`}
          >
            Delete
          </button>
        </div>
      </form>
    </li>
  );
};

export default CommentEditForm;
