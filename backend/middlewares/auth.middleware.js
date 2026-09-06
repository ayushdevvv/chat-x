import { requireAuth } from "@clerk/express";

export const authUser = requireAuth();