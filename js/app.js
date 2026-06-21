import {
  searchRecipesByName,
  getRecipeById,
  getRandomRecipe
} from "./api.js";

import {
  getFavoritesFromStorage,
  saveFavoritesToStorage,
  getWeeklyPlanFromStorage,
  saveWeeklyPlanToStorage
} from "./storage.js";

import {
  renderRecipes,
  renderFavorites,
  renderWeeklyPlan,
  renderRecipeModal,
  closeRecipeModal,
  setStatusMessage
} from "./ui.js";

let currentRecipes = [];
let favorites = getFavoritesFromStorage();
let weeklyPlan = getWeeklyPlanFromStorage();

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const recipesGrid = document.querySelector("#recipes-grid");
const favoritesList = document.querySelector("#favorites-list");
const plannerForm = document.querySelector("#planner-form");
const plannerRecipeSelect = document.querySelector("#planner-recipe");
const plannerDaySelect = document.querySelector("#planner-day");
const plannerMealSelect = document.querySelector("#planner-meal");
const weeklyPlanContainer = document.querySelector("#weekly-plan");
const closeModalButton = document.querySelector("#close-modal");
const recipeModal = document.querySelector("#recipe-modal");
const randomButton = document.querySelector("#random-button");

function updateUI() {
  renderRecipes(currentRecipes, favorites);
  renderFavorites(favorites);
  renderWeeklyPlan(weeklyPlan);
}

async function handleSearch(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query.length < 2) {
    setStatusMessage("Escribe al menos 2 caracteres para buscar.");
    return;
  }

  try {
    setStatusMessage("Buscando recetas...");
    currentRecipes = await searchRecipesByName(query);

    if (currentRecipes.length === 0) {
      setStatusMessage("No se encontraron recetas con ese nombre.");
    } else {
      setStatusMessage(`Se encontraron ${currentRecipes.length} receta(s).`);
    }

    updateUI();
  } catch (error) {
    console.error(error);
    setStatusMessage("Ocurrió un error al buscar recetas.");
  }
}

async function handleRandomRecipe() {
  try {
    setStatusMessage("Buscando receta aleatoria...");

    const recipe = await getRandomRecipe();

    if (!recipe) {
      setStatusMessage("No se pudo obtener una receta aleatoria.");
      return;
    }

    currentRecipes = [recipe];
    setStatusMessage("Receta aleatoria cargada correctamente.");
    updateUI();
  } catch (error) {
    console.error(error);
    setStatusMessage("Ocurrió un error al obtener la receta aleatoria.");
  }
}

async function handleRecipesGridClick(event) {
  const clickedElement = event.target;

  const recipeId = clickedElement.dataset.id;

  if (!recipeId) {
    return;
  }

  if (clickedElement.classList.contains("btn-view")) {
    await showRecipeDetails(recipeId);
  }

  if (clickedElement.classList.contains("btn-favorite")) {
    await toggleFavorite(recipeId);
  }
}

async function showRecipeDetails(recipeId) {
  try {
    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      setStatusMessage("No se encontró el detalle de la receta.");
      return;
    }

    renderRecipeModal(recipe);
  } catch (error) {
    console.error(error);
    setStatusMessage("Ocurrió un error al cargar el detalle.");
  }
}

async function toggleFavorite(recipeId) {
  const recipeAlreadyExists = favorites.some((recipe) => {
    return recipe.idMeal === recipeId;
  });

  if (recipeAlreadyExists) {
    favorites = favorites.filter((recipe) => {
      return recipe.idMeal !== recipeId;
    });

    removeRecipeFromWeeklyPlan(recipeId);
  } else {
    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      setStatusMessage("No se pudo añadir la receta a favoritos.");
      return;
    }

    favorites.push({
      idMeal: recipe.idMeal,
      strMeal: recipe.strMeal,
      strMealThumb: recipe.strMealThumb,
      strCategory: recipe.strCategory,
      strArea: recipe.strArea
    });
  }

  saveFavoritesToStorage(favorites);
  saveWeeklyPlanToStorage(weeklyPlan);
  updateUI();
}

function handleFavoritesClick(event) {
  const clickedElement = event.target;

  if (!clickedElement.classList.contains("btn-remove")) {
    return;
  }

  const recipeId = clickedElement.dataset.id;

  favorites = favorites.filter((recipe) => {
    return recipe.idMeal !== recipeId;
  });

  removeRecipeFromWeeklyPlan(recipeId);

  saveFavoritesToStorage(favorites);
  saveWeeklyPlanToStorage(weeklyPlan);
  updateUI();
}

function handlePlannerSubmit(event) {
  event.preventDefault();

  const recipeId = plannerRecipeSelect.value;
  const selectedDay = plannerDaySelect.value;
  const selectedMeal = plannerMealSelect.value;

  const selectedRecipe = favorites.find((recipe) => {
    return recipe.idMeal === recipeId;
  });

  if (!selectedRecipe) {
    return;
  }

  weeklyPlan[selectedDay][selectedMeal] = selectedRecipe;

  saveWeeklyPlanToStorage(weeklyPlan);
  renderWeeklyPlan(weeklyPlan);

  plannerForm.reset();
}

function handleWeeklyPlanClick(event) {
  const clickedElement = event.target;

  if (!clickedElement.classList.contains("btn-remove")) {
    return;
  }

  const day = clickedElement.dataset.day;
  const meal = clickedElement.dataset.meal;

  weeklyPlan[day][meal] = null;

  saveWeeklyPlanToStorage(weeklyPlan);
  renderWeeklyPlan(weeklyPlan);
}

function removeRecipeFromWeeklyPlan(recipeId) {
  Object.keys(weeklyPlan).forEach((day) => {
    Object.keys(weeklyPlan[day]).forEach((meal) => {
      const plannedRecipe = weeklyPlan[day][meal];

      if (plannedRecipe && plannedRecipe.idMeal === recipeId) {
        weeklyPlan[day][meal] = null;
      }
    });
  });
}

function handleModalClick(event) {
  if (event.target === recipeModal) {
    closeRecipeModal();
  }
}

searchForm.addEventListener("submit", handleSearch);
randomButton.addEventListener("click", handleRandomRecipe);
recipesGrid.addEventListener("click", handleRecipesGridClick);
favoritesList.addEventListener("click", handleFavoritesClick);
plannerForm.addEventListener("submit", handlePlannerSubmit);
weeklyPlanContainer.addEventListener("click", handleWeeklyPlanClick);
closeModalButton.addEventListener("click", closeRecipeModal);
recipeModal.addEventListener("click", handleModalClick);

updateUI();


    