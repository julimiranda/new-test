import { prisma } from "~/db.server";

export const createUser = async (
  email?: string,
  name?: string,
  password?: string,
) => {
  return await prisma.user.create({
    data: {
      email: email as string,
      name: name as string,
      password: password as string,
    },
  });
};
