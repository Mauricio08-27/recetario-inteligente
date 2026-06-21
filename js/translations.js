export const ingredientTranslations = {
  chicken: "pollo",
  "chicken breast": "pechuga de pollo",
  "chicken breasts": "pechugas de pollo",
  beef: "carne de res",
  pork: "cerdo",
  salmon: "salmón",
  tuna: "atún",
  shrimp: "camarones",
  prawns: "langostinos",
  fish: "pescado",

  rice: "arroz",
  pasta: "pasta",
  spaghetti: "espagueti",
  noodles: "fideos",
  potato: "patata",
  potatoes: "patatas",
  bread: "pan",
  flour: "harina",

  onion: "cebolla",
  onions: "cebollas",
  garlic: "ajo",
  tomato: "tomate",
  tomatoes: "tomates",
  carrot: "zanahoria",
  carrots: "zanahorias",
  lettuce: "lechuga",
  cucumber: "pepino",
  pepper: "pimiento",
  peppers: "pimientos",
  mushroom: "champiñón",
  mushrooms: "champiñones",

  egg: "huevo",
  eggs: "huevos",
  milk: "leche",
  cheese: "queso",
  butter: "mantequilla",
  cream: "nata",
  yogurt: "yogur",

  salt: "sal",
  sugar: "azúcar",
  oil: "aceite",
  "olive oil": "aceite de oliva",
  vinegar: "vinagre",
  water: "agua",
  honey: "miel",

  parsley: "perejil",
  basil: "albahaca",
  oregano: "orégano",
  thyme: "tomillo",
  rosemary: "romero",
  paprika: "pimentón",
  cumin: "comino",
  cinnamon: "canela",
  ginger: "jengibre",
  chilli: "chile",
  chili: "chile",

  lemon: "limón",
  lime: "lima",
  orange: "naranja",
  apple: "manzana",
  banana: "plátano",

  "soy sauce": "salsa de soja",
  "tomato puree": "puré de tomate",
  "tomato paste": "pasta de tomate",
  stock: "caldo",
  "chicken stock": "caldo de pollo",
  "vegetable stock": "caldo de verduras"
};

export const categoryTranslations = {
  Beef: "Carne de res",
  Chicken: "Pollo",
  Dessert: "Postre",
  Lamb: "Cordero",
  Miscellaneous: "Variado",
  Pasta: "Pasta",
  Pork: "Cerdo",
  Seafood: "Mariscos",
  Side: "Acompañamiento",
  Starter: "Entrante",
  Vegan: "Vegano",
  Vegetarian: "Vegetariano",
  Breakfast: "Desayuno",
  Goat: "Cabra"
};

export const areaTranslations = {
  American: "Estadounidense",
  British: "Británica",
  Canadian: "Canadiense",
  Chinese: "China",
  Croatian: "Croata",
  Dutch: "Neerlandesa",
  Egyptian: "Egipcia",
  Filipino: "Filipina",
  French: "Francesa",
  Greek: "Griega",
  Indian: "India",
  Irish: "Irlandesa",
  Italian: "Italiana",
  Jamaican: "Jamaicana",
  Japanese: "Japonesa",
  Kenyan: "Keniata",
  Malaysian: "Malaya",
  Mexican: "Mexicana",
  Moroccan: "Marroquí",
  Polish: "Polaca",
  Portuguese: "Portuguesa",
  Russian: "Rusa",
  Spanish: "Española",
  Thai: "Tailandesa",
  Tunisian: "Tunecina",
  Turkish: "Turca",
  Unknown: "Origen desconocido",
  Vietnamese: "Vietnamita"
};

export const instructionTranslations = {};

export function translateIngredient(ingredient) {
  if (!ingredient) {
    return "";
  }

  const normalizedIngredient = ingredient.trim().toLowerCase();

  return ingredientTranslations[normalizedIngredient] || ingredient;
}

export function translateCategory(category) {
  if (!category) {
    return "Sin categoría";
  }

  return categoryTranslations[category] || category;
}

export function translateArea(area) {
  if (!area) {
    return "Origen no disponible";
  }

  return areaTranslations[area] || area;
}

export function translateMeasure(measure) {
  if (!measure) {
    return "";
  }

  return measure
    .replaceAll("cups", "tazas")
    .replaceAll("cup", "taza")
    .replaceAll("tbsp", "cucharada")
    .replaceAll("tsp", "cucharadita")
    .replaceAll("tablespoons", "cucharadas")
    .replaceAll("tablespoon", "cucharada")
    .replaceAll("teaspoons", "cucharaditas")
    .replaceAll("teaspoon", "cucharadita")
    .replaceAll("oz", "onzas");
}

export function getSpanishInstructions(recipe) {
  if (!recipe || !recipe.idMeal) {
    return "No hay instrucciones disponibles.";
  }

  return (
    instructionTranslations[recipe.idMeal] ||
    recipe.strInstructions ||
    "No hay instrucciones disponibles."
  );
}

export function autoTranslateText(text) {
  if (!text) return "";

  let translated = text;

  // REEMPLAZOS BÁSICOS (puedes ampliar esto)
  translated = translated
    .replace(/chicken/gi, "pollo")
    .replace(/beef/gi, "carne de res")
    .replace(/garlic/gi, "ajo")
    .replace(/onion/gi, "cebolla")
    .replace(/carrot/gi, "zanahoria")
    .replace(/potato/gi, "patata")
    .replace(/salt/gi, "sal")
    .replace(/pepper/gi, "pimienta")
    .replace(/oil/gi, "aceite")
    .replace(/water/gi, "agua")
    .replace(/sugar/gi, "azúcar")

    // VERBOS DE COCINA
    .replace(/add/gi, "añadir")
    .replace(/mix/gi, "mezclar")
    .replace(/cook/gi, "cocinar")
    .replace(/heat/gi, "calentar")
    .replace(/boil/gi, "hervir")
    .replace(/fry/gi, "freír")
    .replace(/cut/gi, "cortar")
    .replace(/stir/gi, "remover")

    // FRASES
    .replace(/step/gi, "Paso");

  return translated;
}
