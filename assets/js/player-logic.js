// assets/js/player-logic.js - Versão Simplificada

function sanitizeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
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
            src="https://www.dailymotion.com/embed/video/${videoUrl}?autoplay=1&ui-components=controls&fullscreen=1" 
            allowfullscreen 
            webkitallowfullscreen 
            mozallowfullscreen 
            allow="autoplay; fullscreen; picture-in-picture">
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
        Object.keys(seriesData.dailymotion_videos).forEach(key => {
            const [season, episode] = key.split('_').map(Number);
            if (season === currentSeason && episode > 0) {
                episodes.push({
                    number: episode,
                    key: key,
                    title: `Episódio ${episode}`,
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
    
    // Garantir que o fullscreen funcione
    setTimeout(() => {
        const iframe = document.querySelector('#dailymotion-player iframe');
        if (iframe) {
            // Força os atributos de fullscreen
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('webkitallowfullscreen', 'true');
            iframe.setAttribute('mozallowfullscreen', 'true');
            
            // Adiciona event listener para fullscreen
            iframe.addEventListener('load', () => {
                console.log('Player carregado - Fullscreen habilitado');
            });
        }
    }, 1000);
});

// Função para testar fullscreen manualmente
function testFullscreen() {
    const iframe = document.querySelector('#dailymotion-player iframe');
    if (iframe && iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe && iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe && iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
    }
}

// Adiciona botão de teste (apenas para debug)
if (window.location.search.includes('debug=1')) {
    setTimeout(() => {
        const testBtn = document.createElement('button');
        testBtn.textContent = 'Teste Fullscreen';
        testBtn.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;padding:10px;background:#ff9800;color:#000;border:none;border-radius:4px;cursor:pointer;';
        testBtn.onclick = testFullscreen;
        document.body.appendChild(testBtn);
    }, 2000);
}