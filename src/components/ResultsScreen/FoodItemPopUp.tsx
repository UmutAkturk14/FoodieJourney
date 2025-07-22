import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Badge } from "@components/ui/Badge";
import { NutritionLabel } from "./NutritionalLabel";

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
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click is directly on the overlay (not inside popup content)
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={popupRef}
        className="bg-white dark:bg-card rounded-xl shadow-2xl w-full max-w-4xl relative p-6 animate-in fade-in slide-in-from-bottom duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Left Column: Description & Info */}
          <div className="flex-1">
            {/* Title & Description */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-card-foreground mb-1">
                {food.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {food.description}
              </p>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
              <div>
                <strong>Calories:</strong> {food.calories} kcal
              </div>
              <div>
                <strong>Processing:</strong>{" "}
                {food.processing_level || "Unknown"}
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

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {food.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column: Nutrition Facts */}
          {food.nutritional_data && (
            <div className="w-full md:w-[280px] shrink-0">
              <NutritionLabel data={food.nutritional_data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
