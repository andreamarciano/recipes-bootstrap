import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const initialRecipes = [
    { name: "Tomato Sauce" },
    { name: "Tiramisu" },
    { name: "Orange Vanilla Cake" },
  ];

  for (const recipe of initialRecipes) {
    await prisma.recipe.upsert({
      where: { name: recipe.name },
      update: {},
      create: recipe,
    });
  }

  console.log("✅ Seeded initial recipes.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
