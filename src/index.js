import './css/styles.css';
import Notiflix from 'notiflix';
import { searchPictures } from './searchPictures.js';

import {
  renderUserListItems,
  clearMarkup,
  hide,
  show,
  notifySuccess,
} from './renderFunction.js';
let page = 1;
let limit = 40;

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLoad = document.querySelector('.load-more');
hide();

let name = form.elements.searchQuery;

form.addEventListener('submit', findListOfPictures);
buttonLoad.addEventListener('click', loadAdditionalImage);

async function findListOfPictures(e) {
  e.preventDefault();
  hide();
  clearMarkup();

  if (page > 1) {
    page = 1;
    limit = 40;
  }

  try {
    let query = name.value;

    const images = await searchPictures(query);

    if (images.total === 0 || name.value === '') {
      throw new Error(error);
    }

    renderUserListItems(images);
    notifySuccess(images);

    if (limit < images.totalHits) {
      show();
    }

    page += 1;
    limit += 40;
  } catch (error) {
    clearMarkup();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    hide();
  }
}

async function loadAdditionalImage(query) {
  try {
    let query = name.value;

    const images = await searchPictures(query);

    renderUserListItems(images);
    page += 1;
    limit += 40;

    if (limit >= images.totalHits) {
      throw new Error(images.status);
    }
  } catch (error) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    hide();
  }
}

export { gallery, buttonLoad, page };
