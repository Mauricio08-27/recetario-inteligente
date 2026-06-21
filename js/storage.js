const FAVORITES_KEY = "meal-planner-favorites";
const WEEKLY_PLAN_KEY = "meal-planner-weekly-plan";

export function getFavoritesFromStorage() {
  const favoritesAsString = localStorage.getItem(FAVORITES_KEY);

  if (!favoritesAsString) {
    return [];
  }

  try {
    return JSON.parse(favoritesAsString);
  } catch (error) {
    console.error("Error leyendo favoritos:", error);
    return [];
  }
}

export function saveFavoritesToStorage(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function getWeeklyPlanFromStorage() {
  const weeklyPlanAsString = localStorage.getItem(WEEKLY_PLAN_KEY);

  if (!weeklyPlanAsString) {
    return createEmptyWeeklyPlan();
  }

  try {
    return JSON.parse(weeklyPlanAsString);
  } catch (error) {
    console.error("Error leyendo planificación semanal:", error);
    return createEmptyWeeklyPlan();
  }
}

export function saveWeeklyPlanToStorage(weeklyPlan) {
  localStorage.setItem(WEEKLY_PLAN_KEY, JSON.stringify(weeklyPlan));
}

export function createEmptyWeeklyPlan() {
  return {
    monday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    tuesday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    wednesday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    thursday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    friday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    saturday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    sunday: {
      breakfast: null,
      lunch: null,
      dinner: null
    }
  };
}