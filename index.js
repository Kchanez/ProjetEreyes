const apiKey = 'f419f1613639c532f9f464ad9e648767'; 
const totalPages = 1; 
let moviesData = []; 

function fetchMultiplePages() {
    for (let page = 1; page <= totalPages; page++) {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=${page}`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(film => {
                    fetchMovieDetails(film.id); 
                });
            })
            .catch(error => console.error(`Erreur lors de la récupération de la page ${page}:`, error));
    }
}

function fetchMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`)
        .then(response => response.json())
        .then(movieDetails => {
            moviesData.push({
                posterPath: movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
                title: movieDetails.title || 'Titre inconnu',
                originalLanguage: movieDetails.original_language || 'Langue inconnue',
                genres: movieDetails.genres ? movieDetails.genres.map(genre => genre.name).join(', ') : 'Genre non disponible',
                releaseYear: movieDetails.release_date ? movieDetails.release_date.split('-')[0] : 'Année inconnue',
                popularity: movieDetails.popularity || 'Inconnue',
                productionCountries: movieDetails.production_countries ? movieDetails.production_countries.map(country => country.name).join(', ') : 'Pays non disponible',
                duration: movieDetails.runtime ? `${movieDetails.runtime} minutes` : 'Durée inconnue',
                vote: movieDetails.vote_average || 'Non noté',
                overview: movieDetails.overview || 'Résumé non disponible'
            });

            displayMovieInfo(movieDetails);

            updateCharts();
        })
        .catch(error => console.error(`Erreur lors de la récupération des détails du film ${movieId}:`, error));
}

// Fonction pour afficher les informations d'un film dans le DOM
function displayMovieInfo(movie) {
    const title = movie.title || 'Titre inconnu';
    const originalLanguage = movie.original_language || 'Langue inconnue';
    const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'Genre non disponible';
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Année inconnue';
    const popularity = movie.popularity || 'Inconnue';
    const productionCountries = movie.production_countries ? movie.production_countries.map(country => country.name).join(', ') : 'Pays non disponible';
    const duration = movie.runtime ? `${movie.runtime} minutes` : 'Durée inconnue';
    const overview = movie.overview || 'Résumé non disponible';
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
    const vote = movie.vote_average || 'Non noté';

    const movieInfo = `
        <div class="movie">
            <img src="${posterPath}" alt="${title} Poster">
            <h2>${title}</h2>
            <p><strong>Langue d'origine:</strong> ${originalLanguage}</p>
            <p><strong>Genre:</strong> ${genres}</p>
            <p><strong>Année de sortie:</strong> ${releaseYear}</p>
            <p><strong>Popularité:</strong> ${popularity}</p>
            <p><strong>Pays de production:</strong> ${productionCountries}</p>
            <p><strong>Durée:</strong> ${duration}</p>
            <p><strong>Note moyenne:</strong> ${vote}</p>
            <p><strong>Résumé:</strong> ${overview}</p>
        </div>
    `;
    document.getElementById('movies').innerHTML += movieInfo;
}

fetchMultiplePages();
