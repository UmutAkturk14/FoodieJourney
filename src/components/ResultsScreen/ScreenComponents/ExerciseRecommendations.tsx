import { Badge } from "@components/ui/Badge";
import { Card } from "@components/ui/Card";
import { Activity, Clock } from "lucide-react";

interface ExerciseType {
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  type: string;
  equipment: string;
}

function ExerciseRecommendations({
  EXERCISE_RECOMMENDATIONS,
}: {
  EXERCISE_RECOMMENDATIONS: ExerciseType[];
}) {
  return (
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
  );
}

export default ExerciseRecommendations;
