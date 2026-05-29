const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies-container');

const API_KEY = '8f806940';
const API_URL = 'http://www.omdbapi.com';

function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;
  fetchMovies(query);
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});

async function fetchMovies(query) {
  const url = `${API_URL}/?s=${query}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === 'True') {
    displayMovies(data.Search);
  } else {
    moviesContainer.innerHTML = '<p class="no-results">No movies found. Try another search.</p>';
  }
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-card');

  const poster = movie.Poster !== 'N/A'
    ? `<img src="${movie.Poster}" alt="" onerror="this.parentElement.innerHTML='<div class=\'no-poster\'></div>'" />`
    : `<div class="no-poster"></div>`;

  card.innerHTML = `
    ${poster}
    <div class="movie-card-info">
      <h3>${movie.Title}</h3>
      <span>⭐ ${movie.Year}</span>
    </div>
  `;

  return card;
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';
  movies.forEach((movie) => {
    moviesContainer.appendChild(createMovieCard(movie));
  });
}