// assets/js/player-logic.js - Versão com TMDB

function sanitizeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

async function fetchTmdbEpisode(seriesId, season, episode) {
    const isValidTmdbId = !isNaN(Number(seriesId)) && Number(seriesId) < 900000;
    if (!isValidTmdbId) return null;
    
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/${seriesId}/season/${season}/episode/${episode}?api_key=${TMDB_API_KEY}&language=pt-BR`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar episódio TMDB:', error);
        return null;
    }
}

async function fetchTmdbSeason(seriesId, season) {
    const isValidTmdbId = !isNaN(Number(seriesId)) && Number(seriesId) < 900000;
    if (!isValidTmdbId) return null;
    
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/${seriesId}/season/${season}?api_key=${TMDB_API_KEY}&language=pt-BR`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar temporada TMDB:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const seriesId = urlParams.get('series');
    const currentSeason = parseInt(urlParams.get('t')) || 1;
    const currentEpisode = parseInt(urlParams.get('e')) || 1;
    
    if (!seriesId || typeof CONTENT_CATEGORIES === 'undefined') {
        document.getElementById('episode-title').textContent = 'Erro: Dados não encontrados.';
        return;
    }
    
    // Busca a série
    let seriesData = null;
    for (const [categoryKey, categoryData] of Object.entries(CONTENT_CATEGORIES)) {
        if (categoryData.items[seriesId]) {
            seriesData = categoryData.items[seriesId];
            break;
        }
    }
    
    if (!seriesData) {
        document.getElementById('episode-title').textContent = 'Série não encontrada.';
        return;
    }
    
    // Busca o vídeo do episódio atual
    const episodeKey = `${currentSeason}_${currentEpisode}`;
    let videoUrl = null;
    let episodeTitle = `Episódio ${currentEpisode}`;
    
    if (seriesData.episodes && seriesData.episodes[episodeKey]) {
        videoUrl = seriesData.episodes[episodeKey].video;
        episodeTitle = seriesData.episodes[episodeKey].title;
    } else if (seriesData.dailymotion_videos) {
        videoUrl = seriesData.dailymotion_videos[episodeKey];
        
        // Busca título do TMDB se não tiver título específico
        const tmdbEpisode = await fetchTmdbEpisode(seriesId, currentSeason, currentEpisode);
        if (tmdbEpisode && tmdbEpisode.name) {
            episodeTitle = tmdbEpisode.name;
        }
    }
    
    if (!videoUrl) {
        document.getElementById('dailymotion-player').innerHTML = `<p style="color:red;padding:20px;">Vídeo não encontrado para T${currentSeason} E${currentEpisode}</p>`;
        return;
    }
    
    // Define título
    const seriesTitle = seriesData.title || 'Série';
    const fullTitle = `${seriesTitle} | T${currentSeason} E${currentEpisode} - ${episodeTitle}`;
    document.getElementById('page-title').textContent = fullTitle;
    document.getElementById('episode-title').textContent = fullTitle;
    
    // Renderiza o player
    let playerHtml = '';
    if (videoUrl.startsWith('gdrive:')) {
        const fileId = videoUrl.replace('gdrive:', '');
        const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        playerHtml = `<iframe 
            frameborder="0" 
            width="100%" 
            height="100%" 
            src="${embedUrl}" 
            allowfullscreen 
            webkitallowfullscreen 
            mozallowfullscreen 
            allow="fullscreen; picture-in-picture">
        </iframe>`;
    } else {
        playerHtml = `<iframe 
            frameborder="0" 
            width="100%" 
            height="100%" 
            src="https://www.dailymotion.com/embed/video/${videoUrl}" 
            allowfullscreen 
            webkitallowfullscreen 
            mozallowfullscreen 
            allow="fullscreen">
        </iframe>`;
    }
    document.getElementById('dailymotion-player').innerHTML = playerHtml;
    
    // Renderiza lista de episódios da temporada atual
    const listContainer = document.getElementById('episode-list');
    listContainer.innerHTML = '';
    document.getElementById('current-series-title').textContent = `T${currentSeason} | ${seriesTitle}`;
    
    // Busca todos os episódios da temporada atual
    const episodes = [];
    
    if (seriesData.episodes) {
        Object.keys(seriesData.episodes).forEach(key => {
            const [season, episode] = key.split('_').map(Number);
            if (season === currentSeason && episode > 0) {
                episodes.push({
                    number: episode,
                    key: key,
                    title: seriesData.episodes[key].title,
                    videoId: seriesData.episodes[key].video
                });
            }
        });
    } else {
        // Busca dados da temporada do TMDB para obter títulos
        const tmdbSeason = await fetchTmdbSeason(seriesId, currentSeason);
        
        Object.keys(seriesData.dailymotion_videos).forEach(key => {
            const [season, episode] = key.split('_').map(Number);
            if (season === currentSeason && episode > 0) {
                let episodeTitle = `Episódio ${episode}`;
                
                // Usa título do TMDB se disponível
                if (tmdbSeason && tmdbSeason.episodes) {
                    const tmdbEp = tmdbSeason.episodes.find(e => e.episode_number === episode);
                    if (tmdbEp && tmdbEp.name) {
                        episodeTitle = tmdbEp.name;
                    }
                }
                
                episodes.push({
                    number: episode,
                    key: key,
                    title: episodeTitle,
                    videoId: seriesData.dailymotion_videos[key]
                });
            }
        });
    }
    
    episodes.sort((a, b) => a.number - b.number);
    
    episodes.forEach(ep => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = `?series=${seriesId}&t=${currentSeason}&e=${ep.number}`;
        a.textContent = `E${ep.number}. ${ep.title}`;
        
        if (ep.number === currentEpisode) {
            a.classList.add('active');
        }
        
        li.appendChild(a);
        listContainer.appendChild(li);
    });
    
    // Botões de navegação
    const prevBtn = document.getElementById('prev-episode-btn');
    const nextBtn = document.getElementById('next-episode-btn');
    
    // Botão anterior
    if (currentEpisode > 1) {
        prevBtn.onclick = () => window.location.href = `?series=${seriesId}&t=${currentSeason}&e=${currentEpisode - 1}`;
        prevBtn.disabled = false;
    } else {
        prevBtn.disabled = true;
    }
    
    // Botão próximo
    const maxEpisode = Math.max(...episodes.map(ep => ep.number));
    if (currentEpisode < maxEpisode) {
        nextBtn.onclick = () => window.location.href = `?series=${seriesId}&t=${currentSeason}&e=${currentEpisode + 1}`;
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
    
    // Salva progresso
    const key = `lastWatched_${seriesId}`;
    const value = JSON.stringify({ t: currentSeason, e: currentEpisode });
    localStorage.setItem(key, value);
    
    // Sistema de detecção de fim de vídeo
    setupVideoEndDetection(seriesId, currentSeason, currentEpisode, maxEpisode);
    
    // Botão de fullscreen customizado
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const wrapper = document.querySelector('.dailymotion-embed-wrapper');
            const iframe = document.querySelector('#dailymotion-player iframe');
            
            // Tenta fullscreen no iframe primeiro (mobile)
            if (iframe) {
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.mozRequestFullScreen) {
                    iframe.mozRequestFullScreen();
                } else if (iframe.webkitEnterFullscreen) {
                    iframe.webkitEnterFullscreen();
                }
            }
            
            // Fallback para o wrapper
            if (wrapper && !document.fullscreenElement) {
                setTimeout(() => {
                    if (wrapper.requestFullscreen) {
                        wrapper.requestFullscreen();
                    } else if (wrapper.webkitRequestFullscreen) {
                        wrapper.webkitRequestFullscreen();
                    } else if (wrapper.mozRequestFullScreen) {
                        wrapper.mozRequestFullScreen();
                    }
                }, 100);
            }
        });
    }
});

// Função para detectar fim do vídeo e remover da lista "Continuar Assistindo"
function setupVideoEndDetection(seriesId, currentSeason, currentEpisode, maxEpisode) {
    const iframe = document.querySelector('#dailymotion-player iframe');
    if (!iframe) return;
    
    // Para Google Drive
    if (iframe.src.includes('drive.google.com')) {
        // Detecta inatividade prolongada (assumindo que terminou)
        let lastActivity = Date.now();
        let checkInterval;
        
        const resetActivity = () => {
            lastActivity = Date.now();
        };
        
        // Monitora atividade do usuário
        ['click', 'keydown', 'mousemove', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetActivity);
        });
        
        checkInterval = setInterval(() => {
            const inactiveTime = Date.now() - lastActivity;
            // Se inativo por mais de 30 segundos, considera como terminado
            if (inactiveTime > 30000) {
                clearInterval(checkInterval);
                handleVideoEnd(seriesId, currentSeason, currentEpisode, maxEpisode);
            }
        }, 5000);
        
        // Limpa interval ao sair da página
        window.addEventListener('beforeunload', () => {
            clearInterval(checkInterval);
        });
    }
    
    // Para Dailymotion - usa postMessage API
    else if (iframe.src.includes('dailymotion.com')) {
        window.addEventListener('message', (event) => {
            if (event.origin !== 'https://www.dailymotion.com') return;
            
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'video_end' || 
                    (data.type === 'video_progress' && data.progress >= 0.95)) {
                    handleVideoEnd(seriesId, currentSeason, currentEpisode, maxEpisode);
                }
            } catch (e) {
                // Ignora erros de parsing
            }
        });
    }
}

// Função para identificar se é filme ou série
function isMovie(categoryKey) {
    return ['filmes_animados_dvd', 'filmes_animados_tv', 'especiais_dvd', 'especiais_tv', 'crossovers', 'live_action'].includes(categoryKey);
}

// Função para obter tipo específico do conteúdo
function getContentTypeLabel(categoryKey) {
    switch(categoryKey) {
        case 'especiais_dvd': return 'Especial DVD';
        case 'especiais_tv': return 'Especial TV';
        case 'crossovers': return 'Crossover';
        case 'live_action': return 'Live-Action';
        case 'filmes_animados_dvd':
        case 'filmes_animados_tv': return 'Filme';
        default: return 'Filme';
    }
}

// Função para lidar com o fim do vídeo
function handleVideoEnd(seriesId, currentSeason, currentEpisode, maxEpisode) {
    const key = `lastWatched_${seriesId}`;
    
    // Verifica se é filme
    let isMovieContent = false;
    for (const [categoryKey, categoryData] of Object.entries(CONTENT_CATEGORIES)) {
        if (categoryData.items[seriesId]) {
            isMovieContent = isMovie(categoryKey);
            break;
        }
    }
    
    // Se é filme, sempre remove da lista
    if (isMovieContent) {
        localStorage.removeItem(key);
        console.log(`Filme ${seriesId} removido de "Continuar Assistindo" - filme concluído`);
    }
    // Se é série e último episódio da temporada, remove da lista
    else if (currentEpisode >= maxEpisode) {
        localStorage.removeItem(key);
        console.log(`Série ${seriesId} removida de "Continuar Assistindo" - temporada concluída`);
    }
    // Caso contrário, atualiza para o próximo episódio
    else {
        const nextEpisode = currentEpisode + 1;
        const value = JSON.stringify({ t: currentSeason, e: nextEpisode });
        localStorage.setItem(key, value);
        console.log(`Progresso atualizado para T${currentSeason} E${nextEpisode}`);
    }
}

