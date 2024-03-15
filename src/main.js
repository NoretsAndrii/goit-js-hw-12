import axios from 'axios';

const form = document.querySelector('.search-form');
const gallary = document.querySelector('.gallary');
const loadMoreBtn = document.querySelector('.load-more-btn');
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreClick);

let numberPage;
let wordForSearch = '';

function handleSubmit(event) {
  event.preventDefault();
  numberPage = 1;

  wordForSearch = event.currentTarget.elements.input.value;
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
        per_page: 130,
        page: numberPage,
      },
    })
    .then(response => {
      gallary.nextElementSibling.remove();
      gallary.insertAdjacentHTML('beforeend', createContent(response));
      if (gallary.children.length < response.data.totalHits) {
        console.log(111);
        loadMoreBtn.classList.remove('visually-hidden');
      } else {
        loadMoreBtn.classList.add('visually-hidden');
      }
    });
  form.reset();
}

function loadMoreClick(event) {
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
        per_page: 130,
        page: numberPage,
      },
    })
    .then(response => {
      gallary.nextElementSibling.remove();
      gallary.insertAdjacentHTML('beforeend', createContent(response));
      if (gallary.children.length < response.data.totalHits) {
        console.log(222);
        loadMoreBtn.classList.remove('visually-hidden');
      } else {
        loadMoreBtn.classList.add('visually-hidden');
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
