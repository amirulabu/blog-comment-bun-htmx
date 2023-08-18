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

const comments: { email: string; body: string }[] = [
  { email: "test@example.com", body: "Hello Malaysia!" },
];

const addComment = (email: string, body: string) => {
  comments.push({ email, body });
};

const sanitizeHtml = (html: string) => {
  // return html;
  // return DOMPurify.sanitize(html);
  return xss(html);
};

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) => html(<Index comments={comments} />))
  .post("/", ({ body }: any) => {
    const res = commentSchema.safeParse(body);
    console.log({ res });
    if (!res.success) {
      return <CommentForm isError={true} />;
    }
    addComment(sanitizeHtml(res.data.email), sanitizeHtml(res.data.body));
    console.log(comments);
    return <CommentForm isError={false} />;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
