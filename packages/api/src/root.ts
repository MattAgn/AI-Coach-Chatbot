import { authRouter } from "./router/auth";
import { chatbotRouter } from "./router/chatbot";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  chatbot: chatbotRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
