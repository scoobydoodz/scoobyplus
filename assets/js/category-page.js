// assets/js/category-page.js - Lógica para páginas de categoria

// Função de sanitização
function sanitizeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Função para buscar dados do TMDB
async function fetchTmdbData(endpoint) {
    const url = `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=pt-BR`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorMessage = response.status === 401 
                ? 'Chave API inválida' 
                : response.status === 404 
                ? 'Conteúdo não encontrado' 
                : `Erro ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar ${endpoint}:`, error.message);
        return null;
    }
}

// Função para determinar categoria pela URL
function getCategoryFromUrl() {
    const path = window.location.pathname;
    if (path.includes('series.html')) return 'series';
    if (path.includes('filmes-dvd.html')) return 'filmes_animados_dvd';
    if (path.includes('filmes-tv.html')) return 'filmes_animados_tv';
    if (path.includes('especiais-dvd.html')) return 'especiais_dvd';
    if (path.includes('especiais-tv.html')) return 'especiais_tv';
    if (path.includes('crossovers.html')) return 'crossovers';
    if (path.includes('live-action.html')) return 'live_action';
    return 'series';
}

// Função para determinar tipo de conteúdo
function getContentType(categoryKey) {
    return categoryKey === 'series' ? 'tv' : 'movie';
}

// Função para criar card de conteúdo
function createContentCard(id, data) {
    const posterPath = data.poster_path ? `https://image.tmdb.org/t/p/w342${data.poster_path}` : 'https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=SEM+CAPA';
    
    const title = data.name || data.title || 'Título não disponível';
    const releaseDate = data.first_air_date || data.release_date;
    const year = releaseDate ? sanitizeHtml(releaseDate.substring(0, 4)) : 'N/A';
    
    const card = document.createElement('a');
    card.href = `../series/series-page.html?series=${encodeURIComponent(id)}`;
    card.className = 'series-card';
    card.dataset.releaseYear = parseInt(releaseDate ? releaseDate.substring(0, 4) : '9999');
    card.innerHTML = `
        <img src="${posterPath}" alt="${sanitizeHtml(title)}">
        <div class="card-info">
            <h3>${sanitizeHtml(title)}</h3>
            <p>${year}</p>
        </div>
    `;
    return card;
}

// Função para criar card com dados manuais
function createManualCard(id, itemData) {
    let posterPath = 'https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=SEM+CAPA';
    if (itemData.poster_path) {
        posterPath = itemData.poster_path.startsWith('http') 
            ? itemData.poster_path 
            : `https://image.tmdb.org/t/p/w342${itemData.poster_path}`;
    }
    const title = itemData.title || 'Título não disponível';
    const year = itemData.year || 'N/A';
    
    const card = document.createElement('a');
    // Crossovers e especiais vão direto para o player
    const targetPage = (id.startsWith('cross') || id.startsWith('dvd') || id.startsWith('tv')) ? 'player.html' : 'series-page.html';
    card.href = `../series/${targetPage}?series=${encodeURIComponent(id)}`;
    card.className = 'series-card';
    card.dataset.releaseYear = parseInt(itemData.release_year || itemData.year || 9999);
    card.innerHTML = `
        <img src="${posterPath}" alt="${sanitizeHtml(title)}">
        <div class="card-info">
            <h3>${sanitizeHtml(title)}</h3>
            <p>${year}</p>
        </div>
    `;
    return card;
}

// Função para aguardar carregamento das variáveis
function waitForData() {
    return new Promise((resolve) => {
        const checkData = () => {
            if (typeof CONTENT_CATEGORIES !== 'undefined' && typeof TMDB_API_KEY !== 'undefined') {
                resolve();
            } else {
                setTimeout(checkData, 100);
            }
        };
        checkData();
    });
}



// Lógica principal
document.addEventListener('DOMContentLoaded', async () => {
    // Aguarda o carregamento dos dados
    try {
        await waitForData();
    } catch (error) {
        document.getElementById('content-grid').innerHTML = '<p>Erro ao carregar dados de configuração.</p>';
        return;
    }
    
    const categoryKey = getCategoryFromUrl();
    const categoryData = CONTENT_CATEGORIES[categoryKey];
    
    if (!categoryData) {
        document.getElementById('content-grid').innerHTML = '<p>Categoria não encontrada.</p>';
        return;
    }
    
    const itemIds = Object.keys(categoryData.items);
    if (itemIds.length === 0) {
        document.getElementById('content-grid').innerHTML = '<p>Nenhum conteúdo disponível nesta categoria.</p>';
        return;
    }
    
    // Atualiza título da página
    document.getElementById('page-title').textContent = categoryData.title;
    document.title = `${categoryData.title} - Scooby Plus`;
    
    const contentType = getContentType(categoryKey);
    const grid = document.getElementById('content-grid');
    grid.innerHTML = '';
    
    try {
        const fragment = document.createDocumentFragment();
        
        // Ordena todos os itens por data de lançamento (ano crescente)
        const sortedItemIds = itemIds.sort((a, b) => {
            const itemA = categoryData.items[a];
            const itemB = categoryData.items[b];
            const yearA = parseInt(itemA.release_year || itemA.year || 9999);
            const yearB = parseInt(itemB.release_year || itemB.year || 9999);
            return yearA - yearB;
        });
        
        // Para especiais e crossovers, todos são manuais
        if (categoryKey === 'especiais_dvd' || categoryKey === 'especiais_tv' || categoryKey === 'crossovers') {
            sortedItemIds.forEach(id => {
                const itemData = categoryData.items[id];
                if (itemData && itemData.title) {
                    fragment.appendChild(createManualCard(id, itemData));
                }
            });
        } else {
            // Para outras categorias, separa TMDB dos manuais (já ordenados)
            const tmdbIds = sortedItemIds.filter(id => {
                const numId = Number(id);
                return !isNaN(numId) && numId < 900000 && !id.startsWith('cross') && !id.startsWith('dvd') && !id.startsWith('tv');
            });
            const manualIds = sortedItemIds.filter(id => {
                const numId = Number(id);
                return id.startsWith('cross') || id.startsWith('dvd') || id.startsWith('tv') || (!isNaN(numId) && numId >= 900000);
            });
            
            // Busca dados TMDB e ordena por ano
            if (tmdbIds.length > 0) {
                const itemPromises = tmdbIds.map(id => fetchTmdbData(`${contentType}/${id}`));
                const itemDataArray = await Promise.all(itemPromises);
                
                // Cria array com dados e ordena por ano de lançamento
                const tmdbItems = itemDataArray
                    .map((data, index) => ({ data, id: tmdbIds[index] }))
                    .filter(item => item.data)
                    .sort((a, b) => {
                        const yearA = parseInt((a.data.release_date || a.data.first_air_date || '9999').substring(0, 4));
                        const yearB = parseInt((b.data.release_date || b.data.first_air_date || '9999').substring(0, 4));
                        return yearA - yearB;
                    });
                
                tmdbItems.forEach(({ data, id }) => {
                    fragment.appendChild(createContentCard(id, data));
                });
            }
            
            // Adiciona itens manuais
            manualIds.forEach(id => {
                const itemData = categoryData.items[id];
                if (itemData && itemData.title) {
                    fragment.appendChild(createManualCard(id, itemData));
                }
            });
        }
        
        grid.appendChild(fragment);
        
    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        grid.innerHTML = '<p>Erro ao carregar conteúdo.</p>';
    }
});