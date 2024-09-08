export enum Category {
  Sleep = "Sleep",
  Nutrition = "Nutrition",
  Sport = "Sport",
}

export const coachByCategory: Record<Category, string> = {
  [Category.Sleep]: "sleep-ai-coach",
  [Category.Nutrition]: "nutrition-ai-coach",
  [Category.Sport]: "sport-ai-coach",
};
