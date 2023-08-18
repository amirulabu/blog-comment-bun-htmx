import * as elements from "typed-html";
import CommentList from "../components/comment-list";
import CommentForm from "../components/comment-form";

export default function Index(props: {
  comments: { email: string; body: string }[];
}) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
          crossorigin="anonymous"
        ></link>
        <title>Blog bun htmx</title>
        <style>
          {`
      .fade-me-in.htmx-added {
        border: 3px solid red;
      }
      .fade-me-in {
        border: 0px solid red;
        transition: border-width 1s ease-out;
      }
          `}
        </style>
      </head>
      <body>
        <section class="container-fluid">
          <div class="row py-5">
            <div class="col-lg-8 mx-auto">
              <h1 class="fw-light">Blog example</h1>
              <p class="lead text-muted">
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don't simply skip over it entirely.
              </p>
              <CommentForm isError={false} />
              <CommentList comments={props.comments} />
            </div>
          </div>
        </section>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/htmx.org@1.9.4"
          integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
