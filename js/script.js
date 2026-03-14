let player;
let isPlaying = false;

// 1. CARGAR REPRODUCTOR DE YOUTUBE (API) - MANTENIENDO TU ESTRUCTURA EXACTA
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '6p8L4nLBCdI', // Tu ID exacto
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': '6p8L4nLBCdI', // Necesario para que repita
            'controls': 0,
            'enablejsapi': 1,
            'origin': window.location.origin 
        },
        events: {
            'onReady': (event) => { 
                console.log("Música lista para sonar."); 
                event.target.setVolume(100); 
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a tus secciones
    const btnEnter = document.getElementById('btnEnter');      
    const entrance = document.getElementById('entrance');      
    const mainContent = document.getElementById('main-content'); 
    const musicCtrl = document.getElementById('music-player'); 
    const musicIcon = document.getElementById('music-icon-i'); 

    // Función para mostrar elementos al hacer scroll
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.9) {
                el.classList.add('active');
            }
        });
    };

    // 2. APERTURA DE INVITACIÓN + PLAY MÚSICA
    if (btnEnter) {
        btnEnter.addEventListener('click', () => {
            // Animación de salida de la portada
            if (entrance) {
                entrance.style.transform = "translateY(-100%)";
            }
            
            // INICIAR MÚSICA (Acción directa del usuario)
            if (player && typeof player.playVideo === 'function') {
                player.unMute();
                player.setVolume(100);
                player.playVideo();
                isPlaying = true;
                if (musicCtrl) musicCtrl.classList.add('playing');
            }

            // Mostrar contenido principal
            setTimeout(() => {
                if (mainContent) mainContent.classList.remove('hidden-content');
                if (musicCtrl) musicCtrl.style.display = 'flex';
                if (entrance) entrance.style.display = 'none';
                
                window.scrollTo({ top: 0, behavior: 'instant' });
                revealOnScroll(); 
            }, 800);
        });
    }

    // 3. CONTROL MANUAL (BOTÓN FLOTANTE)
    if (musicCtrl) {
        musicCtrl.addEventListener('click', () => {
            if (player && player.playVideo) {
                if (isPlaying) {
                    player.pauseVideo();
                    if (musicIcon) musicIcon.className = "fa-solid fa-play";
                    musicCtrl.classList.remove('playing');
                } else {
                    player.playVideo();
                    if (musicIcon) musicIcon.className = "fa-solid fa-music";
                    musicCtrl.classList.add('playing');
                }
                isPlaying = !isPlaying;
            }
        });
    }

    // 4. CONTADOR DE TIEMPO
    const targetDate = new Date("Aug 16, 2026 14:00:00").getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        const daysEl = document.getElementById("days");
        
        if (!daysEl) return;

        if (diff > 0) {
            document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    window.addEventListener('scroll', revealOnScroll);
});