import './sass/main.scss';
import NewApiService from './partials/new-service.js';
import articleTpl from './partials/templateImg.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// const basicLightbox = require('basiclightbox');
onFetchError();
const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.my-element-selector'),
};
const newApiService = new NewApiService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
// refs.articlesContainer('click');

function onSearch(e) {
  e.preventDefault();
  newApiService.query = e.currentTarget.elements.query.value;
  if (newApiService.query.length === 0) {
    return;
  }
  newApiService.resetPage();
  newApiService.fetchArticles().then(data => {
    clearArticlesContainer();
    appendArticleMarkup(data);
  });
}
function onLoadMore() {
  newApiService.fetchArticles().then(appendArticleMarkup);
}
function appendArticleMarkup(data) {
  // console.log(data[4].largeImageURL);
  console.log(data.length);
  if (data.length < 8) {
    clearArticlesContainer();
    return;
  }
  refs.articlesContainer.insertAdjacentHTML('beforeend', articleTpl(data));
  refs.loadMoreBtn.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  });
}
function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
function onFetchError() {
  error({
    title: 'Oh No!',
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 4000,
  });
}
