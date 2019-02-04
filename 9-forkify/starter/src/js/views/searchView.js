import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(item => item.classList.remove('results__link--active'))

  document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

export const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];
    title.split(' ').reduce((length, word) => {
      if (length + word.length <= limit) {
        newTitle.push(word);
      }
      return length + word.length;
    }, 0);
    return `${newTitle.join(' ')}...`;
  } else {
    return title;
  }
};

const renderRecipe = recipe => {
  const { recipe_id, image_url, title, publisher } = recipe;
  
  const markup = `
    <li>
      <a class="results__link" href="#${recipe_id}">
        <figure class="results__fig">
          <img src="${image_url}" alt="${title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(title)}</h4>
          <p class="results__author">${publisher}</p>
        </div>
      </a>
    </li>`;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: prev or next
const createButton = (page, type) => `
  <button
    class="btn-inline results__btn--${type}"
    data-goto=${type === 'prev' ? page - 1 : page + 1}
  >
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${
        type === 'prev' ? 'left' : 'right'
      }">
      </use>
    </svg>
  </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // Only want next page button
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Want both buttons
    button = createButton(page, 'prev') + createButton(page, 'next');
  } else if (page === pages && pages > 1) {
    // only want prev page button
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resPerPage);
};
