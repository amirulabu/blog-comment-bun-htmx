import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import Index from "./templates/pages";
import CommentForm from "./templates/components/comment-form";
import { z } from "zod";

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

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) => html(<Index comments={comments} />))
  .post("/", ({ body }: any) => {
    const res = commentSchema.safeParse(body);
    console.log({ res });
    if (!res.success) {
      return <CommentForm isError={true} />;
    }
    addComment(res.data.email, res.data.body);
    console.log(comments);
    return <CommentForm isError={false} />;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
