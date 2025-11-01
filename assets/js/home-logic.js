// assets/js/home-logic.js

// FUNÇÃO DE SANITIZAÇÃO PARA PREVENIR XSS
function sanitizeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// 1. FUNÇÃO PARA FAZER CHAMADA À API DO TMDB (Necessária!)
// Depende das variáveis globais definidas em scooby_doo_data.js
async function fetchTmdbData(endpoint) {
    const url = `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=pt-BR`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorMessage = response.status === 401 
                ? 'Chave API inválida' 
                : response.status === 404 
                ? 'Série não encontrada' 
                : `Erro ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar ${endpoint}:`, error.message);
        showError(error.message);
        return null;
    }
}

function showError(message) {
    const container = document.getElementById('content-sections');
    if (container) {
        container.innerHTML = `<p style="color:red; margin-top: 20px;">❌ ${message}</p>`;
    }
}

// 2. FUNÇÃO PARA RENDERIZAR O BANNER (Melhorada)
function renderHeroBanner(data) {
    if (!data || (!data.name && !data.title)) {
        console.warn('Dados inválidos para o banner');
        return;
    }
    
    const heroContainer = document.getElementById('hero-container');
    if (!heroContainer) {
        console.error('Container do hero banner não encontrado');
        return;
    }
    
    const backdropPath = data.backdrop_path 
        ? `${TMDB_BACKDROP_BASE}${data.backdrop_path}` 
        : 'https://via.placeholder.com/1280x720/0d0d0d/FFFFFF?text=FALTA_IMAGEM';
    
    // Data: 'first_air_date' para séries, 'release_date' para filmes
    const releaseDate = data.first_air_date || data.release_date;
    const year = releaseDate ? sanitizeHtml(releaseDate.substring(0, 4)) : '';
    
    // Nome: 'name' para séries, 'title' para filmes
    const title = data.name || data.title || 'Título não disponível';
    
    // Nota do TMDB
    const rating = data.vote_average ? data.vote_average.toFixed(1) : null;
    const ratingTag = rating ? ` | ⭐ ${rating}` : '';
    
    const description = data.overview 
        ? sanitizeHtml(data.overview.substring(0, 150)) + '...' 
        : 'Sinopse não disponível.';

    heroContainer.innerHTML = `
        <section class="hero-banner">
            <img src="${backdropPath}" alt="Destaque: ${sanitizeHtml(title)}" class="banner-image">
            <div class="banner-content">
                <div class="banner-text">
                    <p class="banner-tag">Melhor Avaliado | ${year}${ratingTag}</p>
                    <h2>${sanitizeHtml(title.toUpperCase())}</h2>
                    <p class="banner-description">${description}</p>
                    <a href="series/series-page.html?series=${encodeURIComponent(data.id)}" class="banner-button">▶ Assistir Agora</a>
                </div>
            </div>
            <div class="banner-fade"></div>
        </section>
    `;
}

// Função para criar card de conteúdo (séries e filmes)
function createContentCard(id, data) {
    // Verifica se é URL completa ou caminho do TMDB
    const posterPath = data.poster_path 
        ? (data.poster_path.startsWith('http') ? data.poster_path : `https://image.tmdb.org/t/p/w342${data.poster_path}`)
        : 'https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=SEM+CAPA';
    
    // Nome: 'name' para séries, 'title' para filmes
    const title = data.name || data.title || 'Título não disponível';
    
    // Data: 'first_air_date' para séries, 'release_date' para filmes
    const releaseDate = data.first_air_date || data.release_date;
    const year = releaseDate ? sanitizeHtml(releaseDate.substring(0, 4)) : 'N/A';
    
    // Nota do TMDB
    const rating = data.vote_average ? data.vote_average.toFixed(1) : null;
    const ratingHtml = rating ? `<span class="rating">⭐ ${rating}</span>` : '';
    
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'carousel-item';
    
    const card = document.createElement('a');
    card.href = `series/series-page.html?series=${encodeURIComponent(id)}`;
    card.className = 'series-card';
    card.innerHTML = `
        <img src="${posterPath}" alt="${sanitizeHtml(title)}">
        <div class="card-info">
            <h3>${sanitizeHtml(title)}</h3>
            <p>${year} ${ratingHtml}</p>
        </div>
    `;
    
    cardWrapper.appendChild(card);
    return cardWrapper;
}

// Função para criar cards com dados manuais (crossovers, etc.)
function createManualContentCard(id, itemData) {
    // Todos usam o mesmo design dos filmes
    return createContentCard(id, {
        title: itemData.title,
        poster_path: itemData.poster_path,
        release_date: itemData.year + '-01-01',
        overview: itemData.overview
    });
}

// Compatibilidade com código existente
function createSeriesCard(id, data) {
    return createContentCard(id, data);
}

// Mapeamento de URLs das categorias
const CATEGORY_URLS = {
    'series': 'categories/series.html',
    'filmes_animados_dvd': 'categories/filmes-dvd.html',
    'filmes_animados_tv': 'categories/filmes-tv.html',
    'especiais_dvd': 'categories/especiais-dvd.html',
    'especiais_tv': 'categories/especiais-tv.html',
    'crossovers': 'categories/crossovers.html',
    'live_action': 'categories/live-action.html'
};

// Função para criar seção de categoria com carrossel
function createCategorySection(categoryKey, categoryData) {
    const section = document.createElement('div');
    section.className = 'category-section';
    section.id = categoryKey;
    
    const categoryUrl = CATEGORY_URLS[categoryKey] || '#';
    
    section.innerHTML = `
        <div class="category-header">
            <h2>${sanitizeHtml(categoryData.title)}</h2>
            <a href="${categoryUrl}" class="ver-mais-btn">Ver Mais ›</a>
        </div>
        <div class="category-carousel" id="carousel-${categoryKey}">
            <button class="carousel-nav prev" onclick="scrollCarousel('${categoryKey}', -1)">‹</button>
            <div class="carousel-wrapper">
                <div class="carousel-container" id="container-${categoryKey}"></div>
            </div>
            <button class="carousel-nav next" onclick="scrollCarousel('${categoryKey}', 1)">›</button>
        </div>
    `;
    return section;
}

// Função para determinar o tipo de conteúdo (tv ou movie)
function getContentType(categoryKey) {
    return categoryKey === 'series' ? 'tv' : 'movie';
}

// Função para navegar no carrossel
function scrollCarousel(categoryKey, direction) {
    const container = document.getElementById(`container-${categoryKey}`);
    if (!container) return;
    
    const itemWidth = 215; // 200px + 15px gap
    const visibleItems = Math.floor(container.parentElement.offsetWidth / itemWidth);
    const scrollAmount = itemWidth * Math.max(1, visibleItems - 1);
    
    const currentTransform = container.style.transform;
    const currentScroll = currentTransform ? parseInt(currentTransform.match(/-?(\d+)/)?.[1] || 0) : 0;
    const newScroll = Math.max(0, currentScroll + (direction * scrollAmount));
    
    container.style.transform = `translateX(-${newScroll}px)`;
    
    // Atualiza estado dos botões
    setTimeout(() => updateCarouselButtons(categoryKey), 50);
}

// Função para atualizar botões do carrossel
function updateCarouselButtons(categoryKey) {
    const container = document.getElementById(`container-${categoryKey}`);
    const carousel = document.getElementById(`carousel-${categoryKey}`);
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const currentTransform = container.style.transform;
    const currentScroll = currentTransform ? parseInt(currentTransform.match(/-?(\d+)/)?.[1] || 0) : 0;
    const maxScroll = Math.max(0, container.scrollWidth - container.parentElement.offsetWidth);
    
    prevBtn.disabled = currentScroll <= 0;
    nextBtn.disabled = currentScroll >= maxScroll;
}

// Função para criar seção "Continuar Assistindo"
async function createContinueWatchingSection() {
    const continueItems = [];
    
    // Busca todos os itens salvos no localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('lastWatched_')) {
            const seriesId = key.replace('lastWatched_', '');
            const progress = JSON.parse(localStorage.getItem(key));
            
            // Busca dados da série
            for (const [categoryKey, categoryData] of Object.entries(CONTENT_CATEGORIES)) {
                if (categoryData.items[seriesId]) {
                    const seriesData = categoryData.items[seriesId];
                    
                    // Busca poster do TMDB se for ID válido
                    let posterUrl = seriesData.poster_path || 'https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=SEM+CAPA';
                    const isValidTmdbId = !isNaN(Number(seriesId)) && Number(seriesId) < 900000;
                    
                    if (isValidTmdbId && !seriesData.poster_path) {
                        try {
                            const contentType = categoryKey === 'series' ? 'tv' : 'movie';
                            const tmdbData = await fetchTmdbData(`${contentType}/${seriesId}`);
                            if (tmdbData && tmdbData.poster_path) {
                                posterUrl = `https://image.tmdb.org/t/p/w342${tmdbData.poster_path}`;
                            }
                        } catch (error) {
                            console.log('Erro ao buscar poster TMDB:', error);
                        }
                    }
                    
                    continueItems.push({
                        id: seriesId,
                        title: seriesData.title || 'Título não disponível',
                        poster: posterUrl,
                        season: progress.t || 1,
                        episode: progress.e || 1,
                        category: categoryKey
                    });
                    break;
                }
            }
        }
    }
    
    if (continueItems.length === 0) return null;
    
    const section = document.createElement('div');
    section.className = 'category-section';
    section.innerHTML = `
        <div class="category-header">
            <h2>Continuar Assistindo</h2>
        </div>
        <div class="continue-watching-grid" id="continue-watching-container"></div>
    `;
    
    const container = section.querySelector('#continue-watching-container');
    
    continueItems.slice(0, 6).forEach(item => {
        const card = document.createElement('a');
        card.className = 'continue-card';
        card.href = item.category === 'series' 
            ? `series/player.html?series=${item.id}&t=${item.season}&e=${item.episode}`
            : `series/series-page.html?series=${item.id}`;
        
        card.innerHTML = `
            <img src="${item.poster}" alt="${item.title}">
            <div class="continue-info">
                <h4>${item.title}</h4>
                <p>T${item.season} E${item.episode}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    return section;
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

// Função para ordenar itens por nota (vote_average)
function sortItemsByRating(itemsWithData) {
    return itemsWithData.sort((a, b) => {
        const ratingA = a.data.vote_average || 0;
        const ratingB = b.data.vote_average || 0;
        return ratingB - ratingA; // Ordem decrescente (maior nota primeiro)
    });
}

// 3. LÓGICA PRINCIPAL DA HOME (Otimizada com categorias e ordenação por nota)
document.addEventListener('DOMContentLoaded', async () => {
    const contentContainer = document.getElementById('content-sections');
    if (!contentContainer) {
        console.error('Container de conteúdo não encontrado');
        return;
    }
    
    // Aguarda o carregamento dos dados
    try {
        await waitForData();
    } catch (error) {
        showError('Erro ao carregar dados de configuração.');
        return;
    }
    
    contentContainer.innerHTML = '';
    let bestRatedItemForBanner = null;
    let highestRating = 0;
    
    // Adiciona seção "Continuar Assistindo" (desktop e mobile)
    const continueSection = await createContinueWatchingSection();
    if (continueSection) {
        contentContainer.appendChild(continueSection);
    }
    
    try {
        // Processa cada categoria
        for (const [categoryKey, categoryData] of Object.entries(CONTENT_CATEGORIES)) {
            const itemIds = Object.keys(categoryData.items);
            
            // Pula categorias vazias
            if (itemIds.length === 0) continue;
            
            // Cria seção da categoria
            const section = createCategorySection(categoryKey, categoryData);
            contentContainer.appendChild(section);
            
            // Determina o tipo de conteúdo (tv para séries, movie para filmes)
            const contentType = getContentType(categoryKey);
            
            const container = section.querySelector('.carousel-container');
            const fragment = document.createDocumentFragment();
            
            // Separa IDs TMDB válidos dos manuais
            const tmdbIds = itemIds.filter(id => {
                const numId = Number(id);
                return !isNaN(numId) && numId < 900000 && !id.startsWith('cross') && !id.startsWith('espdvd') && !id.startsWith('esptv');
            });
            const manualIds = itemIds.filter(id => {
                const numId = Number(id);
                return id.startsWith('cross') || id.startsWith('espdvd') || id.startsWith('esptv') || (!isNaN(numId) && numId >= 900000);
            });
            
            // Busca dados TMDB e organiza por nota
            if (tmdbIds.length > 0) {
                const itemPromises = tmdbIds.map(id => fetchTmdbData(`${contentType}/${id}`));
                const itemDataArray = await Promise.all(itemPromises);
                
                // Cria array com ID e dados para ordenação
                const itemsWithData = itemDataArray
                    .map((data, index) => ({ id: tmdbIds[index], data }))
                    .filter(item => item.data); // Remove itens com erro
                
                // Ordena por nota (maior primeiro)
                const sortedItems = sortItemsByRating(itemsWithData);
                
                // Limita para 11 itens após ordenação
                const limitedItems = sortedItems.slice(0, 11);
                
                limitedItems.forEach(({ id, data }) => {
                    // Encontra o item com maior nota para o banner
                    const rating = data.vote_average || 0;
                    if (rating > highestRating) {
                        highestRating = rating;
                        bestRatedItemForBanner = data;
                    }
                    
                    // Adiciona card ao fragment
                    fragment.appendChild(createContentCard(id, data));
                });
            }
            
            // Adiciona itens manuais (crossovers, etc.) no final
            const limitedManualIds = manualIds.slice(0, Math.max(0, 11 - fragment.children.length));
            limitedManualIds.forEach(id => {
                const itemData = categoryData.items[id];
                if (itemData && itemData.title) {
                    const manualCard = createManualContentCard(id, itemData);
                    fragment.appendChild(manualCard);
                }
            });
            
            container.appendChild(fragment);
            
            // Inicializa botões do carrossel
            setTimeout(() => updateCarouselButtons(categoryKey), 100);
        }
        
        // Renderiza banner com o item de maior nota
        if (bestRatedItemForBanner) {
            renderHeroBanner(bestRatedItemForBanner);
        }
        
    } catch (error) {
        console.error('Erro ao carregar catálogo:', error);
        showError('Falha ao carregar catálogo de conteúdo');
    }
});