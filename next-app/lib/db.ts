import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();
// crate schema, migreate your db, create your client
// this is not the best, we should introduce the singleton here