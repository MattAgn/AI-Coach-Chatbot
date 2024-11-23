import { authRouter } from "./router/auth";
import { chatbotRouter } from "./router/chatbot";
import { postRouter } from "./router/post";
import { voiceRouter } from "./router/voice";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  chatbot: chatbotRouter,
  post: postRouter,
  voice: voiceRouter,
});

export type AppRouter = typeof appRouter;
