import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from './js/pixabay-api.js';
import {
  renderImageGallery,
  clearGallery,
  appendToGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  smoothScroll
} from './js/render-functions.js';

import './css/styles.css';

// DOM elements
const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Global variables
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const perPage = 15;

// Initialize SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Event listeners
if (searchForm) {
  searchForm.addEventListener('submit', onSearchFormSubmit);
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', onLoadMoreClick);
}

// Search form submit handler
async function onSearchFormSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  // Reset pagination for new search
  currentQuery = query;
  currentPage = 1;
  clearGallery(gallery);
  hideLoadMoreBtn(loadMoreBtn);
  showLoader(loader);

  try {
    const data = await fetchImages(query, currentPage, perPage);
    hideLoader(loader);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    const markup = renderImageGallery(data.hits);
    gallery.innerHTML = markup;

    // Refresh lightbox
    lightbox.refresh();

    // Check if there are more images to load
    if (currentPage * perPage < totalHits) {
      showLoadMoreBtn(loadMoreBtn);
    }

    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images!`,
      position: 'topRight',
    });
  } catch (error) {
    hideLoader(loader);
    console.error('Error fetching images:', error);

    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  }
}

// Load more button click handler
async function onLoadMoreClick() {
  currentPage += 1;
  showLoader(loader);

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    hideLoader(loader);

    const markup = renderImageGallery(data.hits);
    appendToGallery(gallery, markup);

    // Refresh lightbox
    lightbox.refresh();

    // Smooth scroll
    smoothScroll();

    // Check if we've reached the end
    if (currentPage * perPage >= totalHits) {
      hideLoadMoreBtn(loadMoreBtn);
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader(loader);
    console.error('Error loading more images:', error);

    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  }
}
