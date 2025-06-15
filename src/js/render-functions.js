function createImageCard(image) {
  return `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${image.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${image.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${image.downloads}
            </p>
          </div>
        </div>
      </a>
    </li>
  `;
}

export function renderImageGallery(images) {
  return images.map(createImageCard).join('');
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function appendToGallery(gallery, markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function showLoader(loader) {
  loader.style.display = 'block';
}

export function hideLoader(loader) {
  loader.style.display = 'none';
}

export function showLoadMoreBtn(btn) {
  btn.style.display = 'block';
}

export function hideLoadMoreBtn(btn) {
  btn.style.display = 'none';
}

export function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
