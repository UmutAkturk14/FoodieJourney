import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { Utensils, Flame } from "lucide-react";
import type { FoodItem } from "./FoodItemPopUp";

function FoodRecommendations({
  filteredFoods,
  setSelectedFood,
}: {
  filteredFoods: FoodItem[];
  setSelectedFood: React.Dispatch<React.SetStateAction<FoodItem | null>>;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-primary p-2 rounded-lg">
          <Utensils className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Recommended Foods
        </h2>
      </div>

      <div className="space-y-4">
        {filteredFoods.map((food, index) => (
          <Card
            key={index}
            className="p-6 bg-card shadow-card border-0 hover:shadow-soft transition duration-300 hover:bg-emerald-300"
            onClick={() => setSelectedFood(food)}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-card-foreground">
                {food.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="w-4 h-4" />
                {food.calories} cal
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {food.description}
            </p>
            <div className="flex items-center justify-between">
              <div />
              <div className="flex gap-1">
                {food.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FoodRecommendations;
