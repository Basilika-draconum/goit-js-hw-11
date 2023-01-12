import { PixabayAPIMain } from './pixabayApi';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputSearchForm: document.querySelector('.search-form_input'),
  buttonSearchForm: document.querySelector('.search-form_button'),
  galleryCards: document.querySelector('.gallery'),
};

const pixabayApi = new PixabayAPIMain();
refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const inputValue = e.target.elements.searchQuery.value;
  e.target.reset();

  refs.galleryCards.innerHTML = '';

  pixabayApi.currentPage = 1;

  if (inputValue.length && inputValue.trim() !== '') {
    const { data } = await pixabayApi.getPixabayApi(inputValue);
    if (data.hits.length) {
      createGalleryCardsMarkup(data.hits);
      return;
    }
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});

function createGalleryCardsMarkup(photos) {
  const markup = photos
    .map(elem => {
      return `<div class="photo-card">
          <img class ="photo-card_image" src="${elem.webformatURL}" alt="${elem.tags}" width ="350px" height ="230px" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b><br>
              ${elem.likes}
            </p>
            <p class="info-item">
              <b>Views</b><br>
              ${elem.views}
            </p>
            <p class="info-item">
              <b>Comments</b><br>
              ${elem.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b><br>
              ${elem.downloads}
            </p>
          </div>
        </div>`;
    })
    .join('');
  refs.galleryCards.insertAdjacentHTML('beforeend', markup);
}
