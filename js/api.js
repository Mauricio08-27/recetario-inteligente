const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchRecipesByName(query) {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);

  if (!response.ok) {
    throw new Error("No se pudo buscar recetas.");
  }

  const data = await response.json();

  return data.meals || [];
}

export async function getRecipeById(recipeId) {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${recipeId}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el detalle de la receta.");
  }

  const data = await response.json();

  return data.meals ? data.meals[0] : null;
}

export async function getRandomRecipe() {
  const response = await fetch(`${API_BASE_URL}/random.php`);

  if (!response.ok) {
    throw new Error("No se pudo obtener una receta aleatoria.");
  }

  const data = await response.json();

  return data.meals ? data.meals[0] : null;
}