import type { UserData } from "@components/HealthQuestionnaire/HealthQuestionnaire";
import { Card } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { useState } from "react";

type PreferencesFormProps = {
  editableUserData: UserData;
  setEditableUserData: React.Dispatch<React.SetStateAction<UserData>>;
  userData: UserData;
};

function PreferencesForm({
  editableUserData,
  setEditableUserData,
  userData,
}: PreferencesFormProps) {
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <>
      {!displayForm && (
        <Button
          variant="call-to-action"
          className="mt-4 text-sm underline"
          onClick={() => setDisplayForm(true)}
        >
          Update preferences
        </Button>
      )}
      {displayForm && (
        <Card className="p-6 bg-card shadow-card border-0 max-w-2xl mx-auto mb-6">
          <h3 className="font-semibold mb-4 text-card-foreground">
            Update Your Preferences
          </h3>
          <div className="space-y-4">
            {/* Eating Habits Horizontal Selector */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-card-foreground mb-4 text-center">
                How would you describe your current eating habits?
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Very healthy",
                  "Mostly healthy",
                  "Average",
                  "Could be better",
                  "Need major improvement",
                ].map((option) => {
                  const isSelected = editableUserData.eatingHabits === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setEditableUserData({
                          ...editableUserData,
                          eatingHabits: option,
                        })
                      }
                      className={`px-5 py-3 rounded-md text-base font-medium transition-all border duration-200 shadow-soft ${
                        isSelected
                          ? "bg-gradient-primary text-primary-foreground shadow-lg"
                          : "bg-card hover:bg-accent hover:shadow-soft text-card-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dietary Needs */}
            {/* Dietary Needs Multi-Selector with exclusive "No restrictions" */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-card-foreground mb-4 text-center">
                Select your dietary needs
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Vegetarian",
                  "Vegan",
                  "Gluten-free",
                  "Dairy-free",
                  "Keto",
                  "Paleo",
                  "No restrictions",
                ].map((option) => {
                  const isSelected =
                    editableUserData.dietaryNeeds.includes(option);

                  const toggleOption = () => {
                    let newSelection: string[] = [];

                    if (option === "No restrictions") {
                      // Selecting "No restrictions" clears others
                      newSelection = isSelected ? [] : ["No restrictions"];
                    } else {
                      // If "No restrictions" is selected, remove it first
                      const withoutNoRestrictions =
                        editableUserData.dietaryNeeds.filter(
                          (item) => item !== "No restrictions"
                        );

                      if (isSelected) {
                        // Remove clicked option
                        newSelection = withoutNoRestrictions.filter(
                          (item) => item !== option
                        );
                      } else {
                        // Add clicked option
                        newSelection = [...withoutNoRestrictions, option];
                      }
                    }

                    setEditableUserData({
                      ...editableUserData,
                      dietaryNeeds: newSelection,
                    });
                  };

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={toggleOption}
                      className={`px-5 py-3 rounded-md text-base font-medium transition-all duration-200 border shadow-soft ${
                        isSelected
                          ? "bg-gradient-primary text-primary-foreground shadow-lg"
                          : "bg-card hover:bg-accent hover:shadow-soft text-card-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Goals */}
            {/* Goals Multi-Selector */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-card-foreground mb-4 text-center">
                Select your goals
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Lose weight",
                  "Gain muscle",
                  "Improve fitness",
                  "Eat healthier",
                  "Increase energy",
                  "Better sleep",
                ].map((goal) => {
                  const isSelected = editableUserData.goals.includes(goal);

                  const toggleGoal = () => {
                    if (isSelected) {
                      setEditableUserData({
                        ...editableUserData,
                        goals: editableUserData.goals.filter((g) => g !== goal),
                      });
                    } else {
                      setEditableUserData({
                        ...editableUserData,
                        goals: [...editableUserData.goals, goal],
                      });
                    }
                  };

                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={toggleGoal}
                      className={`px-4 py-2 rounded shadow-soft transition-all font-semibold border duration-200
            ${
              isSelected
                ? "bg-gradient-primary text-primary-foreground shadow-soft"
                : "bg-card hover:bg-accent hover:shadow-soft"
            }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full justify-center items-center">
            {" "}
            <Button
              variant="call-to-action"
              className="mt-4 text-sm underline"
              onClick={() => {
                setEditableUserData(userData);
                setDisplayForm(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Reset to Original Data
            </Button>
            <Button
              variant="call-to-action"
              className="mt-4 text-sm underline"
              onClick={() => {
                setDisplayForm(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Close
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

export default PreferencesForm;
