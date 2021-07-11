export const recipeListElementTemplate =
  document.querySelector(".recipe__template").content;

export const recipeList = document.querySelector(".recipes");

// form elements
export const recipeFormContainer = document.querySelector(
  ".recipe-form__container"
);
export const recipeForm = document.querySelector(".recipe-form");
export const recipeItemsList = document.querySelector(
  ".recipe-form__list_type_recipe"
);
export const ingredientsItemsList = document.querySelector(
  ".recipe-form__list_type_instructions"
);
export const recipeInput = recipeForm.querySelector(
  ".recipe-form__input_type_recipe"
);
export const instructionsInput = recipeForm.querySelector(
  ".recipe-form__input_type_instructions"
);

// buttons
export const addRecipeButton = document.querySelector(".recipes__add-item");
export const recipeFormCloseButton = document.querySelector(
  ".recipe-form__close-button"
);
export const formSubmitButton = document.querySelector(
  ".recipe-form__submit-button"
);
export const recipeAddButton = document.querySelector(
  ".recipe-form__add-button_type_recipe"
);
export const ingredientsAddButton = document.querySelector(
  ".recipe-form__add-button_type_instructions"
);

export const display = document.querySelector(".display");
export const recipeDisplayContainer =
  document.querySelector(".display__recipe");
