import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import Index from "./templates/pages";
import CommentForm from "./templates/components/comment-form";
import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";
import CommentList from "./templates/components/comment-list";
import CommentEditForm from "./templates/components/comment-edit-form";
import CommentItem from "./templates/components/comment-item";
var xss = require("xss");

const commentSchema = z.object({
  email: z.string().email(),
  body: z.string().min(2),
});

const paramsEditSchema = z.object({
  id: z.string(),
});

const commentBodySchema = z.object({
  body: z.string().min(2),
});

const comments: { id: number; email: string; body: string }[] = [
  { id: 1, email: "test@example.com", body: "Hello Malaysia!" },
];

const addComment = (email: string, body: string) => {
  const id = comments.length + 1;
  comments.push({ id, email, body });
};

const sanitizeHtml = (html: string) => {
  // return html;
  // return DOMPurify.sanitize(html);
  return xss(html);
};

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) => html(<Index comments={comments} />))
  .get("/h/comments", () => <CommentList comments={comments} />)
  .get("/h/comments/:id", ({ params }) => {
    const prm = paramsEditSchema.parse(params);
    const comment = comments.find((c) => c.id === Number(prm.id));
    return <CommentItem comment={comment} />;
  })
  .get("/h/comments/edit/:id", ({ params }) => {
    const prm = paramsEditSchema.parse(params);
    const comment = comments.find((c) => c.id === Number(prm.id));
    if (!comment) {
      return "";
      // return <CommentEditForm isError={true} value="" id={parseInt(prm.id)} />;
    }

    return (
      <CommentEditForm isError={false} value={comment.body} id={comment.id} />
    );
  })
  .put("/h/comments/:id", ({ params, body }) => {
    console.log({ params, body });
    const prm = paramsEditSchema.parse(params);
    const comment = comments.find((c) => c.id === Number(prm.id));
    if (!comment) {
      return "";
    }
    const res = commentBodySchema.safeParse(body);
    if (!res.success) {
      return <CommentEditForm isError={true} value="" id={comment.id} />;
    }
    comment.body = sanitizeHtml(res.data.body);
    return <CommentItem comment={comment} />;
  })
  .delete("/h/comments/:id", ({ params }) => {
    const prm = paramsEditSchema.parse(params);
    const comment = comments.find((c) => c.id === Number(prm.id));
    if (!comment) {
      return "";
    }
    comments.splice(comments.indexOf(comment), 1);
    return "";
  })
  .post("/", ({ body, set }) => {
    const res = commentSchema.safeParse(body);
    console.log({ res });
    if (!res.success) {
      return <CommentForm isError={true} />;
    }
    addComment(sanitizeHtml(res.data.email), sanitizeHtml(res.data.body));
    console.log(comments);
    set.headers["HX-Trigger"] = "my-custom-event";
    return <CommentForm isError={false} />;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
