import { Button } from "@components/ui/Button";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
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
  {
    name: "Mediterranean Quinoa Bowl",
    description:
      "Nutrient-rich quinoa with fresh vegetables, olive oil, and lean protein",
    calories: 420,
    prepTime: "15 min",
    tags: ["High Protein", "Gluten-Free", "Heart Healthy"],
  },
  {
    name: "Green Smoothie Power Pack",
    description: "Spinach, banana, Greek yogurt, and protein powder blend",
    calories: 280,
    prepTime: "5 min",
    tags: ["High Protein", "Dairy", "Energy Boost"],
  },
  {
    name: "Grilled Chicken & Sweet Potato",
    description:
      "Lean grilled chicken breast with roasted sweet potato and steamed broccoli",
    calories: 380,
    prepTime: "25 min",
    tags: ["High Protein", "Low Carb", "Muscle Building"],
  },
  {
    name: "Avocado Toast with Eggs",
    description:
      "Whole grain toast topped with avocado, poached eggs, and hemp seeds",
    calories: 350,
    prepTime: "10 min",
    tags: ["Healthy Fats", "Vegetarian", "Filling"],
  },
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
              {FOOD_RECOMMENDATIONS.map((food, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card shadow-card border-0 hover:shadow-soft transition-shadow duration-300"
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
                      <Clock className="w-4 h-4" />
                      {food.prepTime}
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
    </div>
  );
}
