import { Button } from "@components/ui/Button";
import { RefreshCw } from "lucide-react";

function CallToAction({ onRestart }: { onRestart: () => void }) {
  return (
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
  );
}

export default CallToAction;
