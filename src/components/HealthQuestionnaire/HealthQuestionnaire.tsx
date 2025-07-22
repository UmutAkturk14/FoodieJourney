import { useState, useEffect } from "react";
import { Button } from "@components/ui/Button";
import { Progress } from "@components/ui/Progress";
import { Utensils } from "lucide-react";
import { QuestionCard } from "@components/QuestionCard/QuestionCard";
import { WelcomeScreen } from "@components/WelcomeScreen/WelcomeScreen";
import { ResultsScreen } from "@components/ResultsScreen/ResultsScreen";

export interface UserData {
  age: string;
  gender: string;
  dietaryNeeds: string[];
  eatingHabits: string;
  exerciseFrequency: string;
  goals: string[];
  activityLevel: string;
}

interface Question {
  id: string;
  title: string;
  type: "select" | "multiselect";
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: "age",
    title: "What's your age?",
    type: "select" as const,
    options: ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"],
  },
  {
    id: "gender",
    title: "What's your gender?",
    type: "select" as const,
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
  {
    id: "dietaryNeeds",
    title: "Do you have any dietary preferences or restrictions?",
    type: "multiselect" as const,
    options: [
      "Vegetarian",
      "Vegan",
      "Gluten-free",
      "Dairy-free",
      "Keto",
      "Paleo",
      "No restrictions",
    ],
  },
  {
    id: "eatingHabits",
    title: "How would you describe your current eating habits?",
    type: "select" as const,
    options: [
      "Very healthy",
      "Mostly healthy",
      "Average",
      "Could be better",
      "Need major improvement",
    ],
  },
  {
    id: "activityLevel",
    title: "What's your current activity level?",
    type: "select" as const,
    options: [
      "Sedentary",
      "Lightly active",
      "Moderately active",
      "Very active",
      "Extremely active",
    ],
  },
  {
    id: "exerciseFrequency",
    title: "How often do you exercise per week?",
    type: "select" as const,
    options: ["Never", "1-2 times", "3-4 times", "5-6 times", "Daily"],
  },
  {
    id: "goals",
    title: "What are your health goals?",
    type: "multiselect" as const,
    options: [
      "Lose weight",
      "Gain muscle",
      "Improve fitness",
      "Eat healthier",
      "Increase energy",
      "Better sleep",
    ],
  },
];

export function HealthQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome, 1-7 = questions, 8 = results
  const [userData, setUserData] = useState<Partial<UserData>>({});

  const isWelcome = currentStep === 0;
  const isResults = currentStep === QUESTIONS.length + 1;
  const questionIndex = currentStep - 1;
  const currentQuestion = QUESTIONS[questionIndex];
  const progress = ((currentStep - 1) / QUESTIONS.length) * 100;

  useEffect(() => {
    // Save userData to localStorage on change
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const handleAnswer = (answer: string | string[]) => {
    if (currentQuestion) {
      setUserData((prev) => ({
        ...prev,
        [currentQuestion.id]: answer,
      }));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setUserData({});
  };

  if (isWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (isResults) {
    return (
      <ResultsScreen
        userData={userData as UserData}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentStep} of {QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="animate-fade-in">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={userData[currentQuestion.id as keyof UserData]}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="primary"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep <= 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Utensils className="w-4 h-4" />
            <span>FoodieGoodie</span>
          </div>
        </div>
      </div>
    </div>
  );
}
