export default class Recipe {
  constructor(data, selector, deleteRecipe, recipeClicked) {
    this._data = data;
    this._title = data.title;
    this._description = data.description;
    this._recipe = data.recipe;
    this._pictureUrl = data.picture;
    this._instructions = data.instructions;
    this._id = data.id;
    this._template = selector;
    this._deleteRecipe = deleteRecipe;
    this._recipeClicked = recipeClicked;
  }

  _getListTemplate() {
    // grab the li template and return it
    const recipeTemplate = this._template
      .querySelector(".recipe")
      .cloneNode(true);

    return recipeTemplate;
  }

  _addEventListeners() {
    // set click event on the delete button of this element
    this._recipeDeleteButton.addEventListener("click", () => {
      this._deleteRecipe(this._recipeItem, this._id);
    });
    this._recipeItem.addEventListener("click", (evt) => {
      let clickedElement = evt.target;

      if (clickedElement == this._recipeDeleteButton) {
        console.log(`delete button clicked, doing nothing`);
      } else {
        this._recipeClicked(this._data);
      }
    });
    // set event listener that watches for click on any part of the element other than delete button (to open it in display)
  }

  createRecipe() {
    this._recipeItem = this._getListTemplate();
    this._recipeTitle = this._recipeItem.querySelector(".recipe__title");
    this._recipeDeleteButton = this._recipeItem.querySelector(
      ".recipe__delete-button"
    );
    this._recipeTitle.textContent = this._title;
    this._addEventListeners();

    return this._recipeItem;
  }
}
