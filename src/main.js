import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import request from './js/pixabay-api';
import createContent from './js/render-functions';

const form = document.querySelector('.search-form');
const gallary = document.querySelector('.gallary');
const loadMoreBtn = document.querySelector('.load-more-btn');
const scrollTop = document.querySelector('.scroll-top');

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreClick);

window.addEventListener('scroll', function () {
  if (pageYOffset < 75) {
    scrollTop.classList.add('visually-hidden');
    return;
  }
  scrollTop.classList.remove('visually-hidden');
});

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
  loadMoreBtn.classList.add('visually-hidden');

  request(wordForSearch, numberPage)
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
    })
    .catch(error => console.log(error));
  form.reset();
}

function loadMoreClick(event) {
  loadMoreBtn.classList.add('visually-hidden');
  numberPage += 1;
  gallary.insertAdjacentHTML('afterend', `<span class="loader"></span>`);

  request(wordForSearch, numberPage)
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
    })
    .catch(error => console.log(error));
}
