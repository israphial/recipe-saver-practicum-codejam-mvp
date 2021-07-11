# Sample App for Practicum Hackathon - Recipe Saver

## Desc

This app will be a recipe storage application, that will allow a user to add new recipes and descriptions to a "notebook" containing all previous recipes.
The recipes storage will be contained in localstorage and retrieved on page load.

A plus button will be on the page somewhere to add a recipe, which will open a popup that lets the user give a title, picture, description, and author for making the recipe.
After submitting, that recipe will be added to the recipes data list and will appear in the sidebar with the rest of the recipes.
Recipes will be delete-able.

Each recipe entry will appear in a list that's contained in a sidebar on the right. Clicking on a recipe will fill the contents of main page container with that recipe.

## Questions to answer

- What is displayed on the home page before a recipe is selected, or before the add recipe button is clicked?

## Todo

- main page display pre-recipe selection ideas:

  - "getting started"; explaining what the app does
  - Show most recent recipes created previews at some section

- add "times cooked" to each recipe that shows how many times you've cooked, plus counter

- add a favorite/pin option to recipes that add them to a special container in the sidebar

- Set up deletion functionality for existing recipes

  - the button will be in the <li> for that recipe
  - Removes the recipe from the current session object, then localStorage, then the DOM

  - Mutate object when a recipe is deleted
  - How does the object save when page is loaded or unloaded?
    - object will only change when a new recipe is saved or deleted

- Set up <li> creation for each recipe based on the associated recipe object

  - whole element needs to be clickable, and clicking needs to propagate the info on the main page display

- Create form that allows user to make a new recipe

  - How to handle the ingredients part, and the instructions part? In a form, how can I make 'possible' form fields?
  - When form submitted, preventDefault and send data away to be processed and added to the current session object and localStorage

- Wireframe of the sidebar;
  - Add recipe button that opens the add recipe form
  - Card-like displays for each recipe containing a preview of that recipe (with title and author? and a small version of the picture?)
  - Add scroll behavior to this sidebar when it's overflowing
