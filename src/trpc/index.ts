import { authRouter } from "./auth";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  // anyRoute: publicProcedure.query(() => {
  //   return "hel";
  // }),
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
