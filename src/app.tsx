import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import Index from "./templates/pages";
import CommentForm from "./templates/components/comment-form";
import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";
var xss = require("xss");

const commentSchema = z.object({
  email: z.string().email(),
  body: z.string().min(2),
});

const comments: Comment[] = [
  {
    id: 1,
    email: "test@example.com",
    body: "Hello Malaysia!",
    timestamp: "2023-08-18T12:27:56.173Z",
  },
];

const addComment = (email: string, body: string) => {
  const newId = comments.length + 1;
  const timestamp = new Date().toISOString();
  comments.push({ id: newId, email, body, timestamp });
  console.log(comments);
};

const sanitizeHtml = (html: string) => {
  // return html;
  // return DOMPurify.sanitize(html);
  // return xss(html);
  return html;
};

const app = new Elysia()
  .use(html())

  .get("/", ({ html }) => html(<Index comments={comments} />))

  .post("/", ({ body }: any) => {
    const res = commentSchema.safeParse(body);
    if (!res.success) {
      return <CommentForm isError={true} />;
    }
    addComment(sanitizeHtml(res.data.email), sanitizeHtml(res.data.body));
    return <CommentForm isError={false} />;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
