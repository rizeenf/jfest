import { z } from "zod";
import { authRouter } from "./authRouter";
import { publicProcedure, router } from "./trpc";
import { QueryValidate } from "../lib/validators/query-validator-product";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./paymentRouter";

export const appRouter = router({
  // anyRoute: publicProcedure.query(() => {
  //   return "hel";
  // }),
  auth: authRouter,
  payment: paymentRouter,

  getAllProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidate,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parseQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parseQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parseQueryOpts,
        },
        sort,
        limit,
        depth: 1,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
