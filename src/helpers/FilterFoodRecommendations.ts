// utils/filterFoodRecommendations.ts

import type { UserData } from "@components/HealthQuestionnaire/HealthQuestionnaire";

interface FoodRecommendation {
  name: string;
  description: string;
  calories: number;
  prepTime?: string;
  tags: string[];
}

// === Tag Rules ===
const dietaryRules: Record<
  string,
  { mustHave: string[]; mustNotHave: string[] }
> = {
  Vegan: {
    mustHave: ["vegan", "plant-based"],
    mustNotHave: [
      "contains-dairy",
      "contains-lactose",
      "dairy",
      "milk",
      "butter",
      "dairy-milk",
    ],
  },
  Vegetarian: {
    mustHave: [],
    mustNotHave: ["contains-meat", "meat"], // not in your tags but add if needed
  },
  "Gluten-free": {
    mustHave: [],
    mustNotHave: ["contains-gluten", "gluten", "bread"],
  },
  "Diary-free": {
    mustHave: ["lactose-free"],
    mustNotHave: [
      "contains-dairy",
      "contains-lactose",
      "milk",
      "butter",
      "dairy-milk",
      "dairy",
    ],
  },
  Keto: {
    mustHave: ["low-sugar", "high-fat", "high-protein"],
    mustNotHave: ["contains-sugar", "bread", "whole-grain", "muesli", "cereal"],
  },
  Paleo: {
    mustHave: ["natural", "plant-based", "high-protein"],
    mustNotHave: ["highly-processed", "contains-sugar", "fortified"],
  },
  "No restrictions": {
    mustHave: [],
    mustNotHave: [],
  },
};

// === Preference Boost Tags ===
const goalPreferences: Record<string, string[]> = {
  "Lose weight": ["low-sugar", "sugar-free", "high-fiber", "natural"],
  "Gain muscle": ["high-protein"],
  "Eat healthier": ["natural", "organic", "whole-grain", "high-fiber"],
  "Improve fitness": ["high-protein", "low-sugar"],
  "Increase energy": ["high-fiber", "whole-grain", "oats"],
  "Better sleep": ["natural", "low-sugar"],
};

const habitPreferences: Record<string, string[]> = {
  "Very healthy": ["natural", "organic", "sugar-free", "low-sugar"],
  "Mostly healthy": ["low-sugar", "high-fiber"],
  Average: [],
  "Could be better": [],
  "Need major improvement": [],
};

// === Main Function ===
export function filterFoodRecommendations(
  userData: UserData,
  foods: FoodRecommendation[]
): FoodRecommendation[] {
  const { dietaryNeeds = [], goals = [], eatingHabits = "" } = userData;

  return foods
    .filter((food) => {
      const foodTags = food.tags.map((tag) => tag.toLowerCase());

      // Apply each dietary rule
      for (const need of dietaryNeeds) {
        const rule = dietaryRules[need];
        if (!rule) continue;

        const hasForbidden = rule.mustNotHave.some((t) => foodTags.includes(t));
        const missingRequired = rule.mustHave.some(
          (t) => !foodTags.includes(t)
        );
        if (hasForbidden || missingRequired) return false;
      }

      return true;
    })
    .map((food) => {
      const foodTags = food.tags.map((tag) => tag.toLowerCase());

      // Compute a simple score
      let score = 0;

      for (const goal of goals) {
        const tags = goalPreferences[goal] || [];
        score += tags.filter((t) => foodTags.includes(t)).length;
      }

      for (const habit of [eatingHabits]) {
        const tags = habitPreferences[habit] || [];
        score += tags.filter((t) => foodTags.includes(t)).length;
      }

      return { ...food, _score: score };
    })
    .sort((a, b) => b._score - a._score)
    .map(({ _score, ...rest }) => rest); // Remove score before returning
}
