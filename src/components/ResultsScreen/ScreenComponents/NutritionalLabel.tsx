interface NutritionLabelProps {
  data: {
    energy_kJ: number;
    calories_kcal: number;
    fat_g: number;
    saturated_fat_g: number;
    carbohydrates_g: number;
    sugar_g: number;
    fiber_g: number;
    protein_g: number;
    salt_g: number;
  };
}

export const NutritionLabel: React.FC<NutritionLabelProps> = ({ data }) => {
  const cholesterolMg = Math.round(data.salt_g * 400);
  const sodiumMg = Math.round(data.salt_g * 1000);

  const line = (
    label: string,
    value: string | number | null = "—",
    bold: boolean = false,
    indent: boolean = false
  ) => (
    <div
      className={`flex justify-between ${indent ? "pl-4" : ""} ${bold ? "font-bold" : ""}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="bg-white border-4 border-black p-4 w-full max-w-xs text-black text-sm font-sans">
      <h4 className="text-xl font-extrabold border-b-4 border-black pb-1 mb-2 uppercase">
        Nutrition Facts
      </h4>
      <p className="text-sm mb-2">Serving Size: 100g</p>

      <div className="border-t-4 border-black pt-2">
        {/* Calories */}
        <div className="flex justify-between font-bold text-lg">
          <span>Calories</span>
          <span>
            {data.calories_kcal > 0 ? `${data.calories_kcal} kcal` : "0 kcal"}
          </span>
        </div>

        <div className="border-t border-black my-2"></div>

        <p className="font-semibold text-xs mb-2">% Daily Value*</p>

        {/* Fat */}
        {line("Total Fat", `${data.fat_g}g`, true)}
        {line("Saturated Fat", `${data.saturated_fat_g}g`, false, true)}
        {line("Trans Fat", "0g", false, true)}

        {/* Cholesterol & Sodium */}
        {line("Cholesterol", `${cholesterolMg}mg`, true)}
        {line("Sodium", `${sodiumMg}mg`, true)}

        {/* Carbs */}
        <div className="mt-2">
          {line("Total Carbohydrate", `${data.carbohydrates_g}g`, true)}
          {line("Dietary Fiber", `${data.fiber_g}g`, false, true)}
          {line("Sugars", `${data.sugar_g}g`, false, true)}
        </div>

        {/* Protein */}
        {line("Protein", `${data.protein_g}g`, true)}

        <div className="border-t border-black my-2" />
        <p className="text-[10px] italic text-muted-foreground">
          * Daily values not calculated.
        </p>
      </div>
    </div>
  );
};
