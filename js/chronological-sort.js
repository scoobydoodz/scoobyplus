// js/chronological-sort.js

// Função para obter lista cronológica de séries
function getChronologicalSeriesList() {
    if (typeof CONTENT_CATEGORIES === 'undefined') return [];
    
    const series = CONTENT_CATEGORIES.series.items;
    const seriesArray = Object.keys(series).map(seriesId => ({
        id: seriesId,
        title: getSeriesTitle(seriesId),
        release_year: series[seriesId].release_year || 9999,
        ...series[seriesId]
    }));
    
    return seriesArray.sort((a, b) => a.release_year - b.release_year);
}

// Função auxiliar para obter título da série
function getSeriesTitle(seriesId) {
    const titleMap = {
        "926": "Scooby-Doo, Cadê Você? (1969)",
        "1068": "Os Novos Filmes do Scooby-Doo (1972)",
        "293400": "O Show do Scooby-Doo (1976)",
        "1072": "Os Ho-Ho-Límpicos (1977)",
        "6005": "Scooby-Doo e Scooby-Loo (1979)",
        "1071": "Scooby-Doo e Salsicha-Doo (1980)",
        "novo_show_scooby_loo": "O Novo Show do Scooby-Doo e Scooby-Loo (1983)",
        "64016": "Os Novos Mistérios do Scooby-Doo (1984)",
        "1069": "Os 13 Fantasmas do Scooby-Doo (1985)",
        "418": "Um Filhote Chamado Scooby-Doo (1988)",
        "652": "O Que Há de Novo, Scooby-Doo? (2002)",
        "593": "Salsicha e Scooby: Atrás das Pistas (2006)",
        "18123": "Scooby-Doo! Mystery Incorporated (2010)",
        "64228": "Que Legal, Scooby-Doo! (2015)",
        "88367": "Scooby-Doo e Convidados (2019)",
        "126725": "Velma (2023)"
    };
    
    return titleMap[seriesId] || `Série ${seriesId}`;
}

// Função para exibir lista cronológica no console (para debug)
function displayChronologicalOrder() {
    const chronologicalList = getChronologicalSeriesList();
    console.log('📅 Ordem Cronológica das Séries:');
    chronologicalList.forEach((series, index) => {
        console.log(`${index + 1}. ${series.release_year} - ${series.title}`);
    });
    return chronologicalList;
}