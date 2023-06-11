import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user_roles.createMany({
    data: [
      {
        name: "Admin",
      },

      {
        name: "User",
      },

      {
        name: "Creator",
      },

      {
        name: "Reviewer",
      },
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
