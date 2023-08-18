import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import Index from "./templates/pages";
import CommentForm from "./templates/components/comment-form";
import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";
import CommentList from "./templates/components/comment-list";
import CommentItemForm from "./templates/components/comment-item-form";
import CommentItem from "./templates/components/comment-item";
var xss = require("xss");

const commentSchema = z.object({
  email: z.string().email(),
  body: z.string().min(2),
});

const commentBodySchema = z.object({
  body: z.string().min(2),
});

const commentEditParamsSchema = z.object({
  id: z.string(),
});

const comments: Comment[] = [
  {
    id: 1,
    email: "test@example.com",
    body: "Hello Malaysia!",
    timestamp: "2023-08-18T12:27:56.173Z",
    ipaddr: "",
  },
];

const addComment = (email: string, body: string, ipaddr: string) => {
  const newId = comments.length + 1;
  const timestamp = new Date().toISOString();
  comments.push({ id: newId, email, body, timestamp, ipaddr });
  // console.log(comments);
};

const editComment = (id: number, body: string) => {
  comments[id - 1].body = body;
  return comments[id - 1];
};

const deleteComment = (id: number) => {
  comments.splice(id - 1, 1);
};

const sanitizeHtml = (html: string) => {
  // return html;
  // return DOMPurify.sanitize(html);
  return xss(html);
  // return html;
};

const app = new Elysia()
  .use(html())

  .get("/", ({ html }) => html(<Index comments={comments} />))

  .get("/h/comments", () => <CommentList comments={comments} />)

  .get("/h/comments/:id", ({ params }) => {
    const prm = commentEditParamsSchema.parse(params);
    const comment = comments.find((c) => c.id === parseInt(prm.id));
    if (!comment) {
      return <div>Comment not found!</div>;
    }
    return <CommentItemForm comment={comment} />;
  })

  .put("/h/comments/:id", ({ params, body }) => {
    const prm = commentEditParamsSchema.parse(params);
    const bdy = commentBodySchema.parse(body);
    const comment = editComment(parseInt(prm.id), sanitizeHtml(bdy.body));
    return <CommentItem comment={comment} />;
  })

  .delete("/h/comments/:id", ({ params }) => {
    const prm = commentEditParamsSchema.parse(params);
    deleteComment(parseInt(prm.id));
    return "";
  })

  .get("/h/comments/:id/item", ({ params }) => {
    const prm = commentEditParamsSchema.parse(params);
    const comment = comments.find((c) => c.id === parseInt(prm.id));
    return <CommentItem comment={comment} />;
  })

  .post("/", ({ body, set, headers }) => {
    const res = commentSchema.safeParse(body);
    if (!res.success) {
      return <CommentForm isError={true} />;
    }
    const ipaddr = headers["x-forwarded-for"] || "";
    addComment(
      sanitizeHtml(res.data.email),
      sanitizeHtml(res.data.body),
      ipaddr
    );
    set.headers["HX-Trigger"] = "new-comment-added";
    return <CommentForm isError={false} />;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
