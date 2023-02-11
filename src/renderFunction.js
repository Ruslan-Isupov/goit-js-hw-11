import Notiflix from 'notiflix';
import { gallery } from './index.js';
import { buttonLoad } from './index.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function renderUserListItems(images) {
  const markup = images.hits
    .map(
      image => `
<div class="photo-card">
<a class="gallery__item"  href="${image.largeImageURL}" >
  <img src="${image.webformatURL}" alt="${image.tags}"  />
  </a>
  <div class="info">
  
  <p class="info-item">Likes
  <b>${image.likes}</b>
</p>
<p class="info-item">Views
  <b>${image.views}</b>
</p>
<p class="info-item">Comments
  <b>${image.comments}</b>
</p>
<p class="info-item">Downloads
  <b>${image.downloads}</b>
</p>
  </div>
</div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.gallery a').refresh();
}

function clearMarkup() {
  gallery.innerHTML = '';
}

function hide() {
  buttonLoad.classList.add('unvisible-button');
}

function show() {
  buttonLoad.classList.remove('unvisible-button');
}

function notifySuccess(images) {
  if (images.total !== 0) {
    Notiflix.Notify.success(`Hooray ! We found ${images.totalHits} images`);
  }
}

export { renderExtraImage,renderUserListItems,clearMarkup,hide,show,notifySuccess };

