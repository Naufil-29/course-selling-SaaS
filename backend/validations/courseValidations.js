import { z } from "zod";

export const courseZodSchema = z.object({ 
    title: z.string().min(3).max(50),
    price: z.coerce.number(),
    oldPrice: z.coerce.number(),
    discount: z.coerce.number(),
    image: z.string(),
    video: z.string().url().optional()
});