import * as elements from "typed-html";

const CommentForm = (props: { isError: boolean }) => {
  return (
    <form hx-post="/" hx-swap="outerHTML" class="fade-me-in">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          name="email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Your comment
        </label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          name="body"
        ></textarea>
      </div>{" "}
      {props.isError ? (
        <div class="alert alert-warning" role="alert">
          You missed some input, please check again!
        </div>
      ) : null}
      <div class="mb-3">
        <button class="btn btn-primary"> Submit </button>
      </div>
    </form>
  );
};

export default CommentForm;
