const API_KEY = '22042086-a7502aa63bbf9b5978b2310de';
export default class NewApiService {
  constructor() {
    (this.searchQuery = ''), (this.page = 1);
  }
  fetchArticles() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=8&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
