
// function updateCharts() {
//     const genresCount = {};
//     const languagesCount = {};

//     moviesData.forEach(movie => {
//         movie.genres.split(', ').forEach(genre => {
//             if (genresCount[genre]) {
//                 genresCount[genre]++;
//             } else {
//                 genresCount[genre] = 1;
//             }
//         });

//         if (languagesCount[movie.originalLanguage]) {
//             languagesCount[movie.originalLanguage]++;
//         } else {
//             languagesCount[movie.originalLanguage] = 1;
//         }
//     });

//     const genreLabels = Object.keys(genresCount);
//     const genreData = Object.values(genresCount);

//     const languageLabels = Object.keys(languagesCount);
//     const languageData = Object.values(languagesCount);

//     const totalGenres = genreData.reduce((acc, val) => acc + val, 0);
//     const totalLanguages = languageData.reduce((acc, val) => acc + val, 0);

//     const genreColors = [
//         'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 
//         'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
//         'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(154, 205, 50, 0.2)'
//     ];

//     const languageColors = [
//         'rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 
//         'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)',
//         'rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)'
//     ];

//     const combinedColors = genreColors.concat(languageColors);

//     const ctx = document.getElementById('movies-chart').getContext('2d');
//     const chart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: genreLabels.concat(languageLabels),
//             datasets: [{
//                 label: 'Nombre de films par genre et langue',
//                 data: genreData.concat(languageData),
//                 backgroundColor: combinedColors, 
//                 borderColor: combinedColors.map(color => color.replace('0.2', '1')), 
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             plugins: {
//                 tooltip: {
//                     callbacks: {
//                         label: function(tooltipItem) {
//                             const percentage = (tooltipItem.raw / (totalGenres + totalLanguages)) * 100;
//                             return tooltipItem.raw + " films (" + percentage.toFixed(2) + "%)";
//                         }
//                     }
//                 }
//             }
//         }
//     });

//     const genreSelect = document.getElementById('genre-filter');
//     genreSelect.innerHTML = '<option value="all">Tous les genres</option>';
//     genreLabels.forEach(genre => {
//         genreSelect.innerHTML += `<option value="${genre}">${genre}</option>`;
//     });

//     const languageSelect = document.getElementById('language-filter');
//     languageSelect.innerHTML = '<option value="all">Toutes les langues</option>';
//     languageLabels.forEach(language => {
//         languageSelect.innerHTML += `<option value="${language}">${language}</option>`;
//     });

//     genreSelect.addEventListener('change', filterMovies);
//     languageSelect.addEventListener('change', filterMovies);
// }




function updateCharts() {
    const genresCount = {};
    const languagesCount = {};

    moviesData.forEach(movie => {
        movie.genres.split(', ').forEach(genre => {
            if (genresCount[genre]) {
                genresCount[genre]++;
            } else {
                genresCount[genre] = 1;
            }
        });

        if (languagesCount[movie.originalLanguage]) {
            languagesCount[movie.originalLanguage]++;
        } else {
            languagesCount[movie.originalLanguage] = 1;
        }
    });

    const genreLabels = Object.keys(genresCount);
    const genreData = Object.values(genresCount);

    const languageLabels = Object.keys(languagesCount);
    const languageData = Object.values(languagesCount);

    const totalGenres = genreData.reduce((acc, val) => acc + val, 0);
    const totalLanguages = languageData.reduce((acc, val) => acc + val, 0);
    const totalMovies = totalGenres + totalLanguages;

    const genreColors = [
        'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 
        'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(154, 205, 50, 0.2)'
    ];

    const languageColors = [
        'rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 
        'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)',
        'rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)'
    ];

    const combinedColors = genreColors.concat(languageColors);

    const ctx = document.getElementById('movies-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: genreLabels.concat(languageLabels),
            datasets: [{
                label: 'Nombre de films par genre et langue',
                data: genreData.concat(languageData),
                backgroundColor: combinedColors, 
                borderColor: combinedColors.map(color => color.replace('0.2', '1')), 
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            let percentage = 0;
                            if (tooltipItem.dataIndex < genreData.length) {
                                percentage = (tooltipItem.raw / totalGenres) * 100;
                            } else {
                                percentage = (tooltipItem.raw / totalLanguages) * 100;
                            }
                            return tooltipItem.raw + " films (" + percentage.toFixed(2) + "%)";
                        }
                    }
                }
            }
        }
    });

    // Update genre filter dropdown
    const genreSelect = document.getElementById('genre-filter');
    genreSelect.innerHTML = '<option value="all">Tous les genres</option>';
    genreLabels.forEach(genre => {
        genreSelect.innerHTML += `<option value="${genre}">${genre}</option>`;
    });

    // Update language filter dropdown
    const languageSelect = document.getElementById('language-filter');
    languageSelect.innerHTML = '<option value="all">Toutes les langues</option>';
    languageLabels.forEach(language => {
        languageSelect.innerHTML += `<option value="${language}">${language}</option>`;
    });

    genreSelect.addEventListener('change', filterMovies);
    languageSelect.addEventListener('change', filterMovies);
}
