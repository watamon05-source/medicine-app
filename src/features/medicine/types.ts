export type TakenStatus = {
  morning: boolean
  noon: boolean
  night: boolean
}

export type Medicine = {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  timing: {
    timeOfDay: {
      morning: boolean;
      noon: boolean;
      night: boolean;
      beforeSleep: boolean;
    };
    mealTiming: {
      beforeMeal: boolean;
      afterMeal: boolean;
      betweenMeal: boolean;
    };
  };
};