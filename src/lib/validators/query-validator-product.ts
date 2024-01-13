import { z } from "zod";

export const QueryValidate = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().min(1).max(100),
});

export type TQueryValidate = z.infer<typeof QueryValidate>;
