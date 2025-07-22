import { Button } from "@components/ui/Button";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { filterFoodRecommendations } from "../../helpers/FilterFoodRecommendations";
import { FoodItemPopUp } from "./FoodItemPopUp";
import type { FoodItem } from "./FoodItemPopUp";
import { useState } from "react";
import {
  Utensils,
  Activity,
  RefreshCw,
  Star,
  Clock,
  Flame,
} from "lucide-react";
import type { UserData } from "@components/HealthQuestionnaire/HealthQuestionnaire";

interface ResultsScreenProps {
  userData: UserData;
  onRestart: () => void;
}

// Dummy data for food and exercise recommendations
const FOOD_RECOMMENDATIONS = [
  [
    {
      name: "MinusL Bio H-Milch 3,5% 1l",
      description:
        "Lactose-free organic whole milk, a great option for those with lactose intolerance.",
      calories: 64,
      allergens: ["milk"],
      processing_level: "low",
      nutritional_data: {
        energy_kJ: 267,
        calories_kcal: 64,
        fat_g: 3.5,
        saturated_fat_g: 2.3,
        carbohydrates_g: 4.8,
        sugar_g: 4.8,
        fiber_g: 0.0,
        protein_g: 3.3,
        salt_g: 0.13,
        calcium_unit: 120.0,
      },
      healthiness_rating: "Good",
      tags: ["dairy-milk", "lactose-free", "milk", "organic"],
    },
    {
      name: "Müller Milch High Protein Banane 400ml",
      description:
        "A high-protein banana milk drink, but contains sweeteners and multiple milk derivatives.",
      calories: 65,
      allergens: ["milk"],
      processing_level: "high",
      nutritional_data: {
        energy_kJ: 273,
        calories_kcal: 65,
        fat_g: 1.6,
        saturated_fat_g: 1.1,
        carbohydrates_g: 5.7,
        sugar_g: 5.7,
        protein_g: 6.8,
        salt_g: 0.21,
        thiamin_unit: 0.24,
        riboflavin_unit: 0.37,
        vitamin_b12_unit: 0.52,
        vitamin_b6_unit: 0.29,
      },
      healthiness_rating: "Moderate",
      tags: [
        "contains-sugar",
        "dairy-milk",
        "high-protein",
        "milk",
        "sweetened",
      ],
    },
    {
      name: "Hansano Laktosefreie Milch 1,5% 1l",
      description:
        "Lactose-free milk with 1.5% fat, suitable for lactose intolerant individuals.",
      calories: 38,
      allergens: ["milk"],
      processing_level: "low",
      nutritional_data: {
        energy_kJ: 160,
        calories_kcal: 38,
        fat_g: 1.5,
        saturated_fat_g: 1.0,
        carbohydrates_g: 2.6,
        sugar_g: 2.6,
        protein_g: 3.4,
        salt_g: 0.07,
      },
      healthiness_rating: "Good",
      tags: ["dairy-milk", "lactose-free", "milk"],
    },
    {
      name: "Alpro Mandel-Drink Geröstete Mandel Ohne Zucker vegan 1l",
      description:
        "A vegan, sugar-free roasted almond drink, ideal for lactose intolerant and diabetic users. It's also vegan.",
      calories: 14,
      allergens: ["almonds", "nuts"],
      processing_level: "medium",
      nutritional_data: {
        energy_kJ: 58,
        calories_kcal: 14,
        fat_g: 1.1,
        saturated_fat_g: 0.1,
        carbohydrates_g: 0.0,
        sugar_g: 0.0,
        fiber_g: 0.3,
        protein_g: 0.5,
        salt_g: 0.15,
        vitamin_d_unit: 0.75,
        vitamin_e_unit: 1.8,
        calcium_unit: 120.0,
        jod_unit: 22.5,
        vitamin_b12_unit: 0.38,
      },
      healthiness_rating: "Excellent",
      tags: [
        "lactose-free",
        "plant-based",
        "plant-milk",
        "sugar-free",
        "vegan",
      ],
    },
    {
      name: "Oatly Haferdrink Kakao vegan 1l",
      description:
        "A vegan oat drink with cocoa, containing added sugar and gluten from oats. It's also vegan.",
      calories: 65,
      allergens: ["gluten", "oats"],
      processing_level: "medium",
      nutritional_data: {
        energy_kJ: 273,
        calories_kcal: 65,
        fat_g: 1.5,
        saturated_fat_g: 0.2,
        carbohydrates_g: 11.0,
        sugar_g: 6.8,
        fiber_g: 1.1,
        protein_g: 1.3,
        salt_g: 0.16,
        vitamin_d_unit: 1.1,
        riboflavin_unit: 0.21,
        calcium_unit: 120.0,
        jod_unit: 22.5,
        vitamin_b12_unit: 0.38,
      },
      healthiness_rating: "Moderate",
      tags: [
        "contains-sugar",
        "gluten",
        "oats",
        "plant-based",
        "plant-milk",
        "sweetened",
        "vegan",
      ],
    },
    {
      name: "KitKat Cereal 330g",
      description:
        "A highly processed cereal with multiple forms of sugar, palm oil, and milk derivatives. High in sugar.",
      calories: 420,
      allergens: ["barley", "gluten", "milk", "nuts", "wheat"],
      processing_level: "high",
      nutritional_data: {
        energy_kJ: 1769,
        calories_kcal: 420,
        fat_g: 10.9,
        saturated_fat_g: 4.0,
        carbohydrates_g: 69.4,
        sugar_g: 24.7,
        fiber_g: 6.4,
        protein_g: 7.8,
        salt_g: 0.37,
        riboflavin_unit: 1.1,
        niacin_unit: 10.0,
        folic_acid_unit: 117.0,
        pantothenic_acid_unit: 4.0,
        calcium_unit: 409.0,
        iron_unit: 12.0,
        vitamin_b6_unit: 1.1,
      },
      healthiness_rating: "Poor",
      tags: [
        "cereal",
        "chocolate",
        "contains-dairy",
        "contains-nuts",
        "contains-sugar",
        "fortified",
        "highly-processed",
      ],
    },
    {
      name: "Dr. Oetker Vitalis Joghurt-Müsli 600g",
      description:
        "A muesli with whole oats but includes processed yogurt pieces and added sugar. High in sugar.",
      calories: 414,
      allergens: [
        "almonds",
        "barley",
        "cashew",
        "gluten",
        "hazelnuts",
        "milk",
        "nuts",
        "oats",
        "pecan",
        "soy",
        "wheat",
      ],
      processing_level: "medium",
      nutritional_data: {
        energy_kJ: 1740,
        calories_kcal: 414,
        fat_g: 12.0,
        saturated_fat_g: 4.4,
        carbohydrates_g: 62.0,
        sugar_g: 14.0,
        fiber_g: 7.4,
        protein_g: 11.0,
        salt_g: 0.24,
        magnesium_unit: 74.4,
      },
      healthiness_rating: "Moderate",
      tags: ["contains-dairy", "contains-sugar", "fortified", "muesli"],
    },
    {
      name: "Seitenbacher Protein Müsli 454g",
      description:
        "A high-protein muesli with whole grains and added protein, but also contains raw cane sugar and full milk powder. High in protein. Rich in fiber.",
      calories: 424,
      allergens: ["dinkel", "milk", "oats", "soy", "wheat"],
      processing_level: "medium",
      nutritional_data: {
        energy_kJ: 1780,
        calories_kcal: 424,
        fat_g: 14.0,
        saturated_fat_g: 4.0,
        carbohydrates_g: 40.0,
        sugar_g: 17.0,
        fiber_g: 9.0,
        protein_g: 30.0,
        salt_g: 0.2,
      },
      healthiness_rating: "Good",
      tags: [
        "contains-dairy",
        "contains-sugar",
        "high-fiber",
        "high-protein",
        "muesli",
        "whole-grain",
      ],
    },
    {
      name: "Dr. Oetker Vitalis Schokomüsli klassisch 1125g",
      description:
        "A chocolate muesli with whole oats, but high in various sugars and containing milk chocolate. High in sugar. Rich in fiber.",
      calories: 414,
      allergens: [
        "almonds",
        "barley",
        "cashew",
        "dinkel",
        "gluten",
        "hazelnut",
        "kamut",
        "macadamia",
        "milk",
        "nuts",
        "oats",
        "pecan",
        "pistachio",
        "rye",
        "soy",
        "walnut",
        "wheat",
      ],
      processing_level: "medium",
      nutritional_data: {
        energy_kJ: 1741,
        calories_kcal: 414,
        fat_g: 12.0,
        saturated_fat_g: 4.8,
        carbohydrates_g: 61.0,
        sugar_g: 20.0,
        fiber_g: 8.3,
        protein_g: 11.0,
        salt_g: 0.08,
        magnesium_unit: 87.6,
      },
      healthiness_rating: "Moderate",
      tags: [
        "chocolate",
        "contains-dairy",
        "contains-nuts",
        "contains-sugar",
        "muesli",
      ],
    },
    {
      name: "Kölln Flocken blütenzart 500g",
      description:
        "Delicate whole grain oat flakes, excellent for a natural and fiber-rich breakfast. High in fiber. High in protein.",
      calories: 361,
      allergens: ["gluten", "oats"],
      processing_level: "low",
      nutritional_data: {
        energy_kJ: 1520,
        calories_kcal: 361,
        fat_g: 6.7,
        saturated_fat_g: 1.3,
        carbohydrates_g: 56.0,
        sugar_g: 1.2,
        fiber_g: 11.0,
        protein_g: 14.0,
        salt_g: 0.0,
        thiamin_unit: 0.42,
        phosphor_unit: 436.0,
        magnesium_unit: 147.0,
        iron_unit: 5.4,
        zinc_unit: 3.9,
      },
      healthiness_rating: "Excellent",
      tags: ["high-fiber", "high-protein", "natural", "oats", "whole-grain"],
    },
    {
      name: "REWE Bio Süßrahmbutter 250g",
      description:
        "Organic sweet cream butter, a natural dairy product. Contains lactose.",
      calories: 742,
      allergens: ["milk"],
      processing_level: "low",
      nutritional_data: {
        energy_kJ: 3051,
        calories_kcal: 742,
        fat_g: 82.0,
        saturated_fat_g: 50.0,
        carbohydrates_g: 0.6,
        sugar_g: 0.6,
        fiber_g: 0.0,
        protein_g: 0.4,
        salt_g: 0.02,
      },
      healthiness_rating: "Moderate",
      tags: ["butter", "contains-lactose", "dairy", "high-fat", "organic"],
    },
    {
      name: "Harry Vital & Fit 500g",
      description:
        "A whole grain bread with various seeds, providing good fiber. Rich in fiber.",
      calories: 241,
      allergens: ["barley", "gluten", "oats", "rye", "sesame", "wheat"],
      processing_level: "medium",
      nutritional_data: {
        energy_kJ: 1013,
        calories_kcal: 241,
        fat_g: 4.9,
        saturated_fat_g: 0.8,
        carbohydrates_g: 38.0,
        sugar_g: 2.3,
        fiber_g: 6.9,
        protein_g: 7.7,
        salt_g: 1.0,
        thiamin_unit: 0.17,
        magnesium_unit: 57.0,
      },
      healthiness_rating: "Good",
      tags: [
        "bread",
        "contains-gluten",
        "contains-seeds",
        "high-fiber",
        "whole-grain",
      ],
    },
    {
      name: "Harry 1688 Weizenmischbrot Unser Mildes 500g",
      description:
        "A mild wheat-rye mixed bread, a standard choice for breakfast.",
      calories: 242,
      allergens: ["gluten", "rye", "sesame", "wheat"],
      processing_level: "medium",
      nutritional_data: {
        energy_kJ: 1023,
        calories_kcal: 242,
        fat_g: 2.7,
        saturated_fat_g: 0.3,
        carbohydrates_g: 45.0,
        sugar_g: 2.9,
        fiber_g: 3.8,
        protein_g: 7.5,
        salt_g: 1.0,
      },
      healthiness_rating: "Good",
      tags: ["bread", "contains-gluten"],
    },
    {
      name: "Harry Vital & pur 250g",
      description:
        "A very natural bread rich in oats and various seeds, ideal for high-fiber and low-sugar diets. High in fiber. High in protein. Ideal for diabetic users.",
      calories: 282,
      allergens: ["barley", "eggs", "gluten", "milk", "oats", "sesame", "soy"],
      processing_level: "low",
      nutritional_data: {
        energy_kJ: 1175,
        calories_kcal: 282,
        fat_g: 15.0,
        saturated_fat_g: 2.1,
        carbohydrates_g: 22.0,
        sugar_g: 1.8,
        fiber_g: 5.3,
        protein_g: 12.0,
        salt_g: 1.2,
        vitamin_e_unit: 3.5,
        magnesium_unit: 90.0,
      },
      healthiness_rating: "Excellent",
      tags: [
        "bread",
        "contains-gluten",
        "contains-seeds",
        "high-fiber",
        "high-protein",
        "low-sugar",
      ],
    },
    {
      name: "REWE Bio Brot mit Sonnenblumenkernen 500g",
      description:
        "An organic whole grain rye bread with sunflower seeds, excellent for a healthy, high-fiber diet. Rich in fiber. Ideal for diabetic users.",
      calories: 217,
      allergens: ["gluten", "nuts", "rye", "sesame", "soy"],
      processing_level: "low",
      nutritional_data: {
        energy_kJ: 914,
        calories_kcal: 217,
        fat_g: 4.5,
        saturated_fat_g: 0.7,
        carbohydrates_g: 34.2,
        sugar_g: 1.9,
        fiber_g: 8.2,
        protein_g: 5.9,
        salt_g: 1.2,
      },
      healthiness_rating: "Excellent",
      tags: [
        "bread",
        "contains-gluten",
        "contains-seeds",
        "high-fiber",
        "low-sugar",
        "organic",
        "whole-grain",
      ],
    },
    {
      name: "Harry Knolli Das Kartoffelbrot 500g",
      description:
        "A potato bread with wheat and rye, a good standard bread choice.",
      calories: 215,
      allergens: ["gluten", "rye", "sesame", "wheat"],
      processing_level: "medium",
      nutritional_data: {
        energy_kJ: 910,
        calories_kcal: 215,
        fat_g: 1.4,
        saturated_fat_g: 0.2,
        carbohydrates_g: 41.0,
        sugar_g: 2.4,
        fiber_g: 5.3,
        protein_g: 7.0,
        salt_g: 1.2,
      },
      healthiness_rating: "Good",
      tags: ["bread", "contains-gluten"],
    },
  ],
];

const EXERCISE_RECOMMENDATIONS = [
  {
    name: "Morning Energy Flow",
    description:
      "20-minute yoga flow to start your day with energy and flexibility",
    duration: "20 min",
    difficulty: "Beginner",
    type: "Flexibility",
    equipment: "Yoga Mat",
  },
  {
    name: "HIIT Cardio Blast",
    description: "High-intensity interval training for maximum calorie burn",
    duration: "15 min",
    difficulty: "Intermediate",
    type: "Cardio",
    equipment: "None",
  },
  {
    name: "Strength Building Basics",
    description:
      "Foundational strength exercises focusing on major muscle groups",
    duration: "30 min",
    difficulty: "Beginner",
    type: "Strength",
    equipment: "Dumbbells",
  },
  {
    name: "Evening Relaxation Walk",
    description: "Gentle walking routine to unwind and improve circulation",
    duration: "25 min",
    difficulty: "Beginner",
    type: "Low Impact",
    equipment: "None",
  },
];
export function ResultsScreen({ userData, onRestart }: ResultsScreenProps) {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  // Flatten the food array and apply filters
  const allFoods = FOOD_RECOMMENDATIONS.flat();
  const filteredFoods = filterFoodRecommendations(userData, allFoods);

  return (
    <div className="min-h-screen bg-gradient-soft p-4">
      <div className="max-w-6xl mx-auto mt-[5svh]">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-primary p-3 rounded-full shadow-soft">
              <Star className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Your Personalized Plan
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Based on your responses, here's what we recommend for your health
            journey
          </p>

          {/* User Summary */}
          <Card className="p-6 bg-card shadow-card border-0 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-4 text-card-foreground">
              Your Profile
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge
                variant="secondary"
                className="bg-primary-light text-primary"
              >
                {userData.age} years old
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary-light text-primary"
              >
                {userData.gender}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary-light text-primary"
              >
                {userData.activityLevel}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary-light text-primary"
              >
                Exercise: {userData.exerciseFrequency}
              </Badge>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Food Recommendations */}
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
                  className="p-6 bg-card shadow-card border-0 hover:shadow-soft transition-shadow duration-300 hover:bg-emerald-300"
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {/* If you ever add prepTime back in, it can go here */}
                    </div>
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

          {/* Exercise Recommendations */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Recommended Exercises
              </h2>
            </div>

            <div className="space-y-4">
              {EXERCISE_RECOMMENDATIONS.map((exercise, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card shadow-card border-0 hover:shadow-soft transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-card-foreground">
                      {exercise.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {exercise.duration}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {exercise.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-xs mr-2">
                        {exercise.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs mr-2">
                        {exercise.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Equipment: {exercise.equipment}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button onClick={onRestart} variant="secondary" className="mr-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Button className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-card transition-all duration-300">
            Save My Plan
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Your personalized recommendations are ready! Start implementing them
            today.
          </p>
        </div>
      </div>
      {selectedFood && (
        <FoodItemPopUp
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
}
