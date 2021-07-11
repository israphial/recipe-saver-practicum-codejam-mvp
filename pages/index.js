/*
 */

import Recipe from "../components/recipe.js";
import {
  recipeListElementTemplate,
  addRecipeButton,
  recipeList,
  recipeFormContainer,
  recipeFormCloseButton,
  recipeForm,
  formSubmitButton,
  recipeAddButton,
  ingredientsAddButton,
  recipeInput,
  instructionsInput,
  recipeItemsList,
  ingredientsItemsList,
  display,
  recipeDisplayContainer,
} from "../utils/consts.js";

let loadedData = []; // storage gets loaded into this object on page load
let ingredients = [];
let instructions = [];

const sampleData = [
  {
    title: "Pancakes",
    description: "The recipe for making pancakes",
    recipe: "2 cups flour, 2 wggs, 1 cup milk, sugar, etc.",
    instructions: "bake for 1 hour",
    picture: "sampleurl.com",
    id: 1625342782980,
  },
  {
    title: "Shakshuka",
    description: "The recipe for making Shakshuka",
    recipe: "3 cans tomato sauce, 5 eggs, various other things",
    instructions: "bake for 1 hour",
    picture: "sampleurl.com",
    id: 1625342790424,
  },
  {
    title: "Shephard's Pie",
    description: "The recipe for making Shephard's Pie",
    recipe:
      "2 cups potatoes, 1 cup beef, 1 onion, 1 can corn, 1 cup shredded cheese",
    instructions: "bake for 1 hour",
    picture: "sampleurl.com",
    id: 1625342800841,
  },
];

// uncategorized
//--------------------------------------

function createRecipeObject(data) {
  // do an if check to see if there's an id already, and assign an id if there isn't:
  if (!data.id) {
    const creationId = Date.now();
    data.id = creationId;
  }
  const newRecipe = new Recipe(
    data,
    recipeListElementTemplate,
    (recipe, id) => {
      // deletion callback
      deleteData(id);
      recipe.remove();
    },
    (data) => {
      // recipe clicked callback
      console.log(data);
      const displayData = JSON.stringify(data);
      displayRecipe(displayData);
    }
  );
  const recipeListItem = newRecipe.createRecipe();
  recipeList.prepend(recipeListItem);
}

//--------------------------------------

// Helpers
//--------------------------------------

function addSamplesToLocalStorage() {
  // use this function to "preset" the localStorage with your own recipes. use localStorage.clear() in console to clear the storage.
  const stringifiedData = JSON.stringify(sampleData);
  localStorage.setItem(`recipes`, stringifiedData);
}

function clearForm() {
  // this function clears the form inputs and wipes whatever the <ul> elements have in them, if anything
  recipeForm.reset();
  // also clear uls of all list items:
  document.querySelectorAll(".recipe-form__list-item").forEach((listItem) => {
    listItem.remove();
  });
  // and clear storage arrays:
  instructions.splice(0, instructions.length);
  ingredients.splice(0, ingredients.length);
}

function makeListItem(inputValue) {
  // makes a generic list item that gets returned; for recipe/ingredient inputs
  let listItem = document.createElement("li");
  listItem.classList.add("recipe-form__list-item");
  listItem.textContent = inputValue;
  return listItem;
}

function addToArray(arr, value) {
  // used to store the ingredients/steps in arrays temporarily
  arr.push(value);
}

function addRecipeItem() {
  // called by btn in form when recipe step needs to be added to the ul and associated array
  const inputValue = recipeInput.value;
  const listItem = makeListItem(inputValue);
  recipeItemsList.append(listItem);
  addToArray(ingredients, recipeInput.value);
  recipeInput.value = "";
}

function addIngredientItem() {
  // called by btn in form when ingredient needs to be added to the ul and associated array
  const inputValue = instructionsInput.value;
  const listItem = makeListItem(inputValue);
  ingredientsItemsList.append(listItem);
  addToArray(instructions, instructionsInput.value);
  instructionsInput.value = "";
}

function handleFormSubmit() {
  // gets all standard inputs, as well as the contents of the correct array, and builds an object out of this information.
  const inputs = recipeForm.querySelectorAll(".recipe-form__input");
  const storage = {};
  inputs.forEach((thisInputField) => {
    storage[thisInputField.name] = thisInputField.value;
  });

  storage.recipe = [...ingredients];
  storage.instructions = [...instructions];
  createRecipeObject(storage);
  clearForm();
  recipeFormContainer.classList.remove("visible");
  loadedData.unshift(storage);
  updateLocalStorage();
}

function displayRecipe(data) {
  // also, hide the form if it's open.
  // select display, then put the recipe data in it.
  clearForm();
  recipeFormContainer.classList.remove("visible");
  recipeDisplayContainer.classList.add("visible");
  recipeDisplayContainer.innerText = data;
}

function hideRecipe() {
  // call this whenever the form is opened;
  // select the display and remove any elements in it that don't involve the form. this clears any recipe being displayed.
  recipeDisplayContainer.classList.remove("visible");
  recipeDisplayContainer.innerText = "";
}

//--------------------------------------

// data manipulators
//--------------------------------------

function updateLocalStorage() {
  const stringifiedData = JSON.stringify(loadedData);
  localStorage.setItem("recipes", stringifiedData);
}

function deleteData(id) {
  // updates localData, then pushes the changed localData to localStorage
  const matchingRecipeObj = loadedData.find((thisRecipe) => {
    return thisRecipe.id === id;
  });
  const index = loadedData.indexOf(matchingRecipeObj);
  loadedData.splice(index, 1);
  updateLocalStorage();
}

//--------------------------------------

// Instantiators and initializers
//--------------------------------------

function propagateRecipes() {
  loadedData.forEach((recipeObj) => {
    const newRecipe = new Recipe(
      recipeObj,
      recipeListElementTemplate,
      (recipe, id) => {
        // deletion callback
        // when this is ran via the delete button, the containing li needs to be removed and the storage needs to be updated.
        deleteData(id);
        recipe.remove();
      },
      (data) => {
        // recipe clicked callback
        const displayData = JSON.stringify(data);
        displayRecipe(displayData);
      }
    );
    const recipeListItem = newRecipe.createRecipe();
    recipeList.append(recipeListItem);
  });
}

function addEventListeners() {
  addRecipeButton.addEventListener("click", () => {
    if (!recipeFormContainer.classList.contains("visible")) {
      recipeFormContainer.classList.add("visible");
    }
    hideRecipe();
  });

  recipeFormCloseButton.addEventListener("click", () => {
    if (recipeFormContainer.classList.contains("visible")) {
      recipeFormContainer.classList.remove("visible");
      // the form also needs to be reset and any <ul> child elements need to be deleted, there should be a function specifically for this
      clearForm();
    }
  });

  recipeForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    handleFormSubmit();
  });

  recipeAddButton.addEventListener("click", () => {
    addRecipeItem();
  });

  ingredientsAddButton.addEventListener("click", () => {
    addIngredientItem();
  });
}

function loadData() {
  if (JSON.parse(localStorage.getItem(`recipes`)).length == 0) {
    addSamplesToLocalStorage();
  }
  const storage = JSON.parse(localStorage.getItem("recipes"));
  loadedData = [...storage];
  propagateRecipes();
}

loadData();
addEventListeners();
//--------------------------------------
