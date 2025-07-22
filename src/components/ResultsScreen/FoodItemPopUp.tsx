import { X } from "lucide-react";
import { Badge } from "@components/ui/Badge";

export type FoodItem = {
  name: string;
  description: string;
  calories: number;
  allergens?: string[];
  processing_level?: string;
  healthiness_rating?: string;
  nutritional_data?: {
    energy_kJ: number;
    calories_kcal: number;
    fat_g: number;
    saturated_fat_g: number;
    carbohydrates_g: number;
    sugar_g: number;
    fiber_g: number;
    protein_g: number;
    salt_g: number;
  };
  tags: string[];
};

interface FoodItemPopUpProps {
  food: FoodItem;
  onClose: () => void;
}

export const FoodItemPopUp: React.FC<FoodItemPopUpProps> = ({
  food,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-card rounded-xl shadow-2xl w-full max-w-2xl relative p-6 animate-in fade-in slide-in-from-bottom duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-card-foreground mb-1">
            {food.name}
          </h2>
          <p className="text-sm text-muted-foreground">{food.description}</p>
        </div>

        {/* Nutrition & Details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
          <div>
            <strong>Calories:</strong> {food.calories} kcal
          </div>
          <div>
            <strong>Processing:</strong> {food.processing_level || "Unknown"}
          </div>
          <div>
            <strong>Health Rating:</strong>{" "}
            {food.healthiness_rating || "Unknown"}
          </div>
          <div>
            <strong>Allergens:</strong>{" "}
            {food.allergens && food.allergens.length > 0
              ? food.allergens.join(", ")
              : "None"}
          </div>
        </div>

        {/* Nutritional Breakdown */}
        {food.nutritional_data && (
          <div className="mb-6">
            <h4 className="font-semibold text-card-foreground mb-2">
              Nutritional Info (per 100g)
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
              <div>
                <strong>Energy:</strong> {food.nutritional_data.energy_kJ} kJ
              </div>
              <div>
                <strong>Calories:</strong> {food.nutritional_data.calories_kcal}{" "}
                kcal
              </div>
              <div>
                <strong>Fat:</strong> {food.nutritional_data.fat_g} g
              </div>
              <div>
                <strong>Saturated Fat:</strong>{" "}
                {food.nutritional_data.saturated_fat_g} g
              </div>
              <div>
                <strong>Carbs:</strong> {food.nutritional_data.carbohydrates_g}{" "}
                g
              </div>
              <div>
                <strong>Sugar:</strong> {food.nutritional_data.sugar_g} g
              </div>
              <div>
                <strong>Fiber:</strong> {food.nutritional_data.fiber_g} g
              </div>
              <div>
                <strong>Protein:</strong> {food.nutritional_data.protein_g} g
              </div>
              <div>
                <strong>Salt:</strong> {food.nutritional_data.salt_g} g
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {food.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
