import { Star } from "lucide-react";

const HeaderSection = () => {
  return (
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
        journey.
      </p>
    </div>
  );
};

export default HeaderSection;
