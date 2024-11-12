// Fonction pour télécharger les données des films sous forme de fichier CSV
document.getElementById('download-csv').addEventListener('click', function() {
    // Créer les en-têtes du CSV
    const headers = ['Poster', 'Titre', 'Langue d\'origine', 'Genre', 'Année de sortie', 'Public cible', 'Popularité', 'Pays de production', 'Durée', 'Note moyenne', 'Résumé'];

    // Tableau pour contenir toutes les lignes de données (en-tête + films)
    const csvData = [];
    csvData.push(headers.join(',')); // Ajouter les en-têtes dans le CSV

    // Ajouter chaque film sous forme de ligne
    moviesData.forEach(function(movie) {
        const row = [
            `"${movie.posterPath}"`, 
            `"${movie.title}"`, 
            `"${movie.originalLanguage}"`, 
            `"${movie.genres}"`, 
            `"${movie.releaseYear}"`, 
            `"${movie.targetAudience}"`, 
            `"${movie.popularity}"`, 
            `"${movie.productionCountries}"`, 
            `"${movie.duration}"`, 
            `"${movie.vote}"`, 
            `"${movie.overview.replace(/[\r\n]+/g, ' ').replace(/"/g, '""')}"`
        ];
        csvData.push(row.join(',')); // Ajouter chaque ligne de film au CSV
    });

    // Convertir le tableau en chaîne CSV
    const csvContent = csvData.join('\n');

    // Créer un Blob à partir du contenu CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Créer un lien pour télécharger le fichier
    const link = document.createElement('a');
    if (link.download !== undefined) { // Vérifier si le téléchargement est supporté
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'movies.csv'); // Nom du fichier CSV
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click(); // Simuler le clic pour démarrer le téléchargement
        document.body.removeChild(link); // Supprimer le lien après le téléchargement
    }
});
