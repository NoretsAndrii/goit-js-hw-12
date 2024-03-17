export default function createContent({ data: { hits: arrImages } }) {
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
