import { useParams } from "react-router-dom";

import { RecipeNotFound } from "./_Utils/RecipeUtils";

import TomatoSauce from "./Sauces/TomatoSauce";
import Tiramisu from "./Dessert/Tiramisu";
import VanillaOrangeCake from "./Dessert/VanillaOrangeCake";

const recipesMap: Record<string, React.ReactNode> = {
  tomatosauce: <TomatoSauce />,
  tiramisu: <Tiramisu />,
  vanillaorangecake: <VanillaOrangeCake />,
};

export default function RecipePage() {
  const { slug } = useParams<{ slug: string }>();

  // Recipe Not Found
  if (!slug || !(slug in recipesMap)) {
    return (
      <>
        <RecipeNotFound />
      </>
    );
  }

  return (
    <>
      {/* Render Recipe Page */}
      <div className="container py-4">{recipesMap[slug]}</div>
    </>
  );
}
