import { Button } from "@components/ui/Button";
import { Utensils, Heart, Activity, Target } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-primary p-3 rounded-full shadow-soft">
              <Utensils className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">FoodieGoodie</h1>
          </div>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your personal health companion for better nutrition and fitness.
            Let's create a customized plan just for you!
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 text-center  rounded-xl hover:shadow-md transition-shadow duration-300">
            <div className="bg-emerald-200 shadow-xl text-green-600 p-4 rounded-full w-15 h-15 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800">
              Personalized Nutrition
            </h3>
            <p className="text-sm text-gray-600">
              Get food recommendations tailored to your dietary needs and
              preferences
            </p>
          </div>

          <div className="p-6 text-center  rounded-xl hover:shadow-md transition-shadow duration-300">
            <div className="bg-emerald-200 shadow-xl text-green-600 p-4 rounded-full w-15 h-15 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800">
              Custom Workouts
            </h3>
            <p className="text-sm text-gray-600">
              Receive exercise plans that match your fitness level and goals
            </p>
          </div>

          <div className="p-6 text-center  rounded-xl hover:shadow-md transition-shadow duration-300">
            <div className="bg-emerald-200 shadow-xl text-green-600 p-4 rounded-full w-15 h-15 flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-800">Goal Tracking</h3>
            <p className="text-sm text-gray-600">
              Monitor your progress and stay motivated on your health journey
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={onStart}
            className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-card transition-all duration-300 px-8 py-6 text-lg cursor-pointer"
          >
            Start Your Health Journey
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Takes just 2 minutes • Completely personalized
          </p>
        </div>
      </div>
    </div>
  );
}
