import { Card } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import type { UserData } from "@components/HealthQuestionnaire/HealthQuestionnaire";

function PreferencesSummary({
  editableUserData,
}: {
  editableUserData: UserData;
}) {
  return (
    <Card className="p-6 bg-card shadow-card border-0 max-w-2xl mx-auto">
      <h3 className="font-semibold mb-4 text-card-foreground">
        Your Preferences
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {editableUserData.eatingHabits && (
          <Badge variant="secondary" className="bg-primary-light text-primary">
            {editableUserData.eatingHabits}
          </Badge>
        )}
        {editableUserData.dietaryNeeds.map((diet) => (
          <Badge
            key={diet}
            variant="secondary"
            className="bg-primary-light text-primary"
          >
            {diet}
          </Badge>
        ))}
        {editableUserData.goals.map((goal) => (
          <Badge
            key={goal}
            variant="secondary"
            className="bg-primary-light text-primary"
          >
            Goal: {goal}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

export default PreferencesSummary;
