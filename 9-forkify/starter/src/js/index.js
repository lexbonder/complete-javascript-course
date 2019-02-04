import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global State of the App
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
 */
const state = {};

// Search Controller
const controlSearch = async () => {
  // Get Query from view
  let query = searchView.getInput();
  if (query) {
    // new search object, add it to state
    state.search = new Search(query);

    // Prepare UI for results (loading wheel)
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // Search for recipes
    await state.search.getResults();

    // Render results on UI
    clearLoader();
    searchView.renderResults(state.search.recipes);
  }
};

// Recipe Controller
const controlRecipe = async () => {
  // get id from url
  const id = parseInt(window.location.hash.replace('#', ''), 10);
  if (id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // create new recipe object
    state.recipe = new Recipe(id);
    try {
      // get recipe data
      await state.recipe.getRecipe();
      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      state.recipe.parseIngredients();
      // render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      clearLoader();
    }
  }
};

// List Controller
const controlList = () => {
  // create a new list if we don't have one. (list.length)
  if (!state.list) state.list = new List();

  // add each ingredient to list
  state.recipe.ingredients.forEach(ing => {
    const { count, unit, ingredient } = ing;
    const item = state.list.addItem(count, unit, ingredient);
    listView.renderItem(item);
  });
};

// Likes Controller
const controlLikes = () => {
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;
  // user has not liked current recipe
  if (!state.likes.isLiked(currentId)) {
    // Add like to state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    // Toggle like button
    likesView.toggleLikeBtn(true);

    // Add like to UI list

    likesView.renderLike(newLike);

    // user Has liked current recipe
  } else {
    // remove like from  to state
    state.likes.deleteLike(currentId);

    // Toggle like button
    likesView.toggleLikeBtn(false);

    // remove like from UI list

    likesView.deleteLike(currentId);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Event Listeners

// Restore liked recipes on page load
window.addEventListener('load', () => {
  // create likes object
  state.likes = new Likes();
  // retrieve likes from Local storage
  state.likes.readStorage();
  // toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  // render existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));
})


// Handle List Item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  // Handle Delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
    // Handle Update count
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseInt(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease Button
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase Button
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Calls like controller
    controlLikes();
  }
});

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => {
  window.addEventListener(event, controlRecipe);
});

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.recipes, goToPage);
  }
});
