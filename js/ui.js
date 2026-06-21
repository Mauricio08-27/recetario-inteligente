import {
  translateIngredient,
  translateCategory,
  translateArea,
  translateMeasure,
  getSpanishInstructions,
  autoTranslateText
} from "./translations.js";

import { translateText } from "./translator.js";

export const dayLabels = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo"
};

export const mealLabels = {
  breakfast: "Desayuno",
  lunch: "Almuerzo",
  dinner: "Cena"
};

export function getIngredients(recipe) {
  const ingredients = [];

  for (let index = 1; index <= 20; index++) {
    const ingredient = recipe[`strIngredient${index}`];
    const measure = recipe[`strMeasure${index}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient,
        measure: measure ? translateMeasure(measure.trim()) : ""
      });
    }
  }

  return ingredients;
}

export function renderRecipes(recipes, favorites) {
  const recipesGrid = document.querySelector("#recipes-grid");

  if (!recipesGrid) return;

  recipesGrid.innerHTML = "";

  recipes.forEach((recipe) => {
    const isFavorite = favorites.some((f) => f.idMeal === recipe.idMeal);

    const recipeCard = document.createElement("article");
    recipeCard.classList.add("recipe-card");

    const image = document.createElement("img");
    image.src = recipe.strMealThumb;
    image.alt = `Imagen de ${recipe.strMeal}`;

    const body = document.createElement("div");
    body.classList.add("recipe-card-body");

    const title = document.createElement("h3");
    title.textContent = recipe.strMeal;

    const meta = document.createElement("p");
    meta.classList.add("recipe-meta");
    meta.textContent = `${translateCategory(recipe.strCategory)} · ${translateArea(recipe.strArea)}`;

    const actions = document.createElement("div");
    actions.classList.add("recipe-actions");

    const btnView = document.createElement("button");
    btnView.classList.add("btn-view");
    btnView.dataset.id = recipe.idMeal;
    btnView.textContent = "Ver receta";

    const btnFav = document.createElement("button");
    btnFav.classList.add("btn-favorite");
    btnFav.dataset.id = recipe.idMeal;
    btnFav.textContent = isFavorite ? "Quitar favorito" : "Favorito";

    actions.appendChild(btnView);
    actions.appendChild(btnFav);

    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(actions);

    recipeCard.appendChild(image);
    recipeCard.appendChild(body);

    recipesGrid.appendChild(recipeCard);
  });
}

export function renderFavorites(favorites) {
  const list = document.querySelector("#favorites-list");
  const select = document.querySelector("#planner-recipe");

  if (!list || !select) return;

  list.innerHTML = "";
  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Selecciona una receta favorita";
  defaultOption.value = "";
  select.appendChild(defaultOption);

  if (favorites.length === 0) {
    const empty = document.createElement("div");
    empty.classList.add("empty-box");
    empty.textContent = "Aún no tienes recetas favoritas.";
    list.appendChild(empty);
    return;
  }

  favorites.forEach((recipe) => {
    const item = document.createElement("article");
    item.classList.add("compact-item");

    const img = document.createElement("img");
    img.src = recipe.strMealThumb;

    const info = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = recipe.strMeal;

    const cat = document.createElement("p");
    cat.textContent = translateCategory(recipe.strCategory);

    info.appendChild(title);
    info.appendChild(cat);

    const btn = document.createElement("button");
    btn.classList.add("btn-remove");
    btn.dataset.id = recipe.idMeal;
    btn.textContent = "Quitar";

    item.appendChild(img);
    item.appendChild(info);
    item.appendChild(btn);

    list.appendChild(item);

    const option = document.createElement("option");
    option.value = recipe.idMeal;
    option.textContent = recipe.strMeal;
    select.appendChild(option);
  });
}

export function renderWeeklyPlan(weeklyPlan) {
  const container = document.querySelector("#weekly-plan");
  if (!container) return;

  container.innerHTML = "";

  Object.entries(weeklyPlan).forEach(([day, meals]) => {
    const card = document.createElement("article");
    card.classList.add("day-card");

    const title = document.createElement("h3");
    title.textContent = dayLabels[day];

    card.appendChild(title);

    Object.entries(meals).forEach(([mealKey, recipe]) => {
      const row = document.createElement("div");
      row.classList.add("meal-row");

      const label = document.createElement("span");
      label.textContent = mealLabels[mealKey];

      const name = document.createElement("span");
      name.textContent = recipe ? recipe.strMeal : "Sin receta";

      row.appendChild(label);
      row.appendChild(name);

      if (recipe) {
        const btn = document.createElement("button");
        btn.classList.add("btn-remove");
        btn.dataset.day = day;
        btn.dataset.meal = mealKey;
        btn.textContent = "Eliminar";
        row.appendChild(btn);
      }

      card.appendChild(row);
    });

    container.appendChild(card);
  });
}

export function renderRecipeModal(recipe) {
  const modal = document.querySelector("#recipe-modal");
  const body = document.querySelector("#modal-body");

  if (!modal || !body) return;

  const ingredients = getIngredients(recipe);

  body.innerHTML = "";

  const container = document.createElement("div");

  const img = document.createElement("img");
  img.src = recipe.strMealThumb;

  const title = document.createElement("h2");
  title.textContent = recipe.strMeal;

  
const instructions = document.createElement("p");
instructions.textContent = "Cargando traducción...";

translateText(getSpanishInstructions(recipe)).then((text) => {
  instructions.textContent = text;
});


  container.appendChild(img);
  container.appendChild(title);

  const list = document.createElement("ul");

 ingredients.forEach((item) => {
  const li = document.createElement("li");

  li.textContent = "Traduciendo...";

  translateText(`${item.measure} ${item.ingredient}`).then((text) => {
    li.textContent = text;
  });

  list.appendChild(li);
});

  container.appendChild(list);
  container.appendChild(instructions);

  body.appendChild(container);

  modal.classList.remove("hidden");
}

export function closeRecipeModal() {
  document.querySelector("#recipe-modal")?.classList.add("hidden");
}

export function setStatusMessage(message) {
  const el = document.querySelector("#status-message");
  if (el) el.textContent = message;
}
 