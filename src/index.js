import './sass/main.scss';
import NewApiService from './partials/new-service.js';
import articleTpl from './partials/templateImg.hbs';
import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// const basicLightbox = require('basiclightbox');
const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.my-element-selector'),
};
let onMyIndex;
const newApiService = new NewApiService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
// refs.articlesContainer('click');

function onSearch(e) {
  e.preventDefault();
  newApiService.query = e.currentTarget.elements.query.value;
  if (newApiService.query.length === 0) {
    onFetchError();
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
    onFetchError();
    clearArticlesContainer();
    return;
  }
  onFetchSuccess();
  refs.articlesContainer.insertAdjacentHTML('beforeend', articleTpl(data));
  refs.articlesContainer.addEventListener('click', myImageBig);
  refs.loadMoreBtn.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  });
}
function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
function myImageBig(data) {
  data.preventDefault();
  if (data.target.nodeName !== 'IMG') {
    return;
  }
  console.log(data.target);
}
function onFetchSuccess() {
  success({
    title: 'Вітаю!',
    text: 'Запит виконаний успішно',
    delay: 4000,
  });
}
function onFetchError() {
  error({
    title: 'Помилка!',
    text: 'Щось пішло не так, перевірте правильність написання!',
    delay: 4000,
  });
}
