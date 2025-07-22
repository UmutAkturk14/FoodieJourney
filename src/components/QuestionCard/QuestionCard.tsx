import { useState } from "react";
import { Button } from "@components/ui/Button";
import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { Check } from "lucide-react";

interface Question {
  id: string;
  title: string;
  type: "select" | "multiselect";
  options: string[];
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string | string[]) => void;
  currentAnswer?: string | string[];
}

export function QuestionCard({
  question,
  onAnswer,
  currentAnswer,
}: QuestionCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(currentAnswer)
      ? currentAnswer
      : currentAnswer
        ? [currentAnswer]
        : []
  );

  const handleSingleSelect = (option: string) => {
    onAnswer(option);
  };

  const handleMultiSelect = (option: string) => {
    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelection);
  };

  const handleMultiSelectConfirm = () => {
    if (selectedOptions.length > 0) {
      onAnswer(selectedOptions);
    }
  };

  const isOptionSelected = (option: string) => {
    return selectedOptions.includes(option);
  };

  return (
    <Card className="p-8 bg-card shadow-card border-0">
      <h2 className="text-2xl font-bold text-card-foreground mb-8 text-center">
        {question.title}
      </h2>

      <div className="space-y-3 mb-8">
        {question.options.map((option) => (
          <Button
            key={option}
            variant={isOptionSelected(option) ? "primary" : "secondary"}
            className={`w-full p-4 h-auto text-left justify-start transition-all duration-200 ${
              isOptionSelected(option)
                ? "bg-gradient-primary text-primary-foreground shadow-soft"
                : "hover:bg-accent hover:shadow-soft"
            }`}
            onClick={() =>
              question.type === "select"
                ? handleSingleSelect(option)
                : handleMultiSelect(option)
            }
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-base">{option}</span>
              {isOptionSelected(option) && <Check className="w-5 h-5 ml-2" />}
            </div>
          </Button>
        ))}
      </div>

      {question.type === "multiselect" && (
        <div className="space-y-4">
          {selectedOptions.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Selected:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedOptions.map((option) => (
                  <Badge
                    key={option}
                    variant="secondary"
                    className="bg-primary-light text-primary"
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleMultiSelectConfirm}
            disabled={selectedOptions.length === 0}
            className="w-full bg-emerald-800 text-primary-foreground shadow-soft hover:shadow-card transition-all duration-300"
            size="lg"
          >
            Continue
          </Button>
        </div>
      )}
    </Card>
  );
}
