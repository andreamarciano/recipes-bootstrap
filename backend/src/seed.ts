import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(name: string): string {
  return name
    .normalize("NFD") // separates accented characters from base letters (e.g. "é" → "e" + accent)
    .replace(/[\u0300-\u036f]/g, "") // removes diacritical marks (accents)
    .toLowerCase()
    .replace(/\s+/g, "") // remove spaces
    .replace(/[^\w]/g, ""); // remove special characters (all non-alphanumeric)
}

async function main() {
  const initialRecipes = [
    { name: "Tomato Sauce" },
    { name: "Tiramisu" },
    { name: "Vanilla Orange Cake" },
  ];

  for (const recipe of initialRecipes) {
    const slug = slugify(recipe.name);

    await prisma.recipe.upsert({
      where: { slug },
      update: {
        name: recipe.name,
      },
      create: {
        name: recipe.name,
        slug,
      },
    });
  }

  console.log("✅ Seeded initial recipes.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
