import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const gallary = document.querySelector('.gallary');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreClick);

let numberPage;
let wordForSearch = '';
let lightbox;

function handleSubmit(event) {
  event.preventDefault();
  wordForSearch = event.currentTarget.elements.input.value.trim();

  if (!wordForSearch) {
    event.currentTarget.elements.input.value = '';
    iziToast.warning({
      close: false,
      position: 'topRight',
      progressBar: false,
      message: 'Enter a search word. Please try again!',
    });
    return;
  }

  numberPage = 1;
  gallary.innerHTML = '';
  gallary.insertAdjacentHTML('afterend', `<span class="loader"></span>`);

  axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '42677735-fe61580d2fc9bff74664cab68',
        q: wordForSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: numberPage,
      },
    })
    .then(response => {
      if (response.data.hits.length === 0) {
        gallary.nextElementSibling.remove();
        iziToast.error({
          close: false,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          progressBar: false,
        });
        return;
      }
      gallary.nextElementSibling.remove();
      gallary.insertAdjacentHTML('beforeend', createContent(response));

      lightbox = new SimpleLightbox('.gallary-item-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      if (gallary.children.length < response.data.totalHits) {
        loadMoreBtn.classList.remove('visually-hidden');
      } else {
        loadMoreBtn.classList.add('visually-hidden');
        iziToast.info({
          close: false,
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          progressBar: false,
        });
      }
    });
  form.reset();
}

function loadMoreClick(event) {
  loadMoreBtn.classList.add('visually-hidden');
  numberPage += 1;
  gallary.insertAdjacentHTML('afterend', `<span class="loader"></span>`);

  axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '42677735-fe61580d2fc9bff74664cab68',
        q: wordForSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: numberPage,
      },
    })
    .then(response => {
      gallary.nextElementSibling.remove();
      gallary.insertAdjacentHTML('beforeend', createContent(response));
      let scroll = gallary.firstChild.getBoundingClientRect().height;
      window.scrollBy(0, 2 * scroll);

      lightbox.refresh();

      if (gallary.children.length < response.data.totalHits) {
        loadMoreBtn.classList.remove('visually-hidden');
      } else {
        loadMoreBtn.classList.add('visually-hidden');
        iziToast.info({
          close: false,
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          progressBar: false,
        });
      }
    });
}

function createContent({ data: { hits: arrImages } }) {
  return arrImages
    .map(
      image =>
        `<li class="gallary-item">
      <a class="gallary-item-link" href="${image.largeImageURL}"><img
        class="gallary-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
      /></a>
         <ul class="info-list">
          <li class="info-list-item">
            <h2 class="list-item-title">Likes</h2>
            <p class="list-item-info">${image.likes}</p>
          </li>
          <li class="info-box-list-item">
            <h2 class="list-item-title">Views</h2>
            <p class="list-item-info">${image.views}</p>
          </li>
          <li class="info-box-list-item">
            <h2 class="list-item-title">Comments</h2>
            <p class="list-item-info">${image.comments}</p>
          </li>
          <li class="info-box-list-item">
            <h2 class="list-item-title">Downloads</h2>
            <p class="list-item-info">${image.downloads}</p>
          </li>
        </ul>
       </li>`
    )
    .join('');
}
