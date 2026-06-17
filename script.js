// ===================================================
// SCRIPT GLOBAL — Portfolio Thomas Mansart--Pauvif
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------
    // 1. SCROLL REVEAL
    // -----------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 120;
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // -----------------------------------------------
    // 2. EFFET PARALLAX SUR LE HERO
    // -----------------------------------------------
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            if (scrollValue < 700) {
                heroContent.style.transform = `translateY(${scrollValue * 0.25}px)`;
                heroContent.style.opacity = 1 - (scrollValue / 700);
            }
        });
    }

    // -----------------------------------------------
    // 3. MENU BURGER (mobile)
    // -----------------------------------------------
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            burger.classList.toggle('toggle');
        });
    }

    // -----------------------------------------------
    // 4. TRANSITION DE PAGE (sous-pages uniquement)
    //    Sur index.html c'est le preloader qui gère l'entrée.
    //    Sur toutes les autres pages, on fait un fondu rapide.
    // -----------------------------------------------
    const isIndexPage = window.location.pathname.endsWith('index.html')
                     || window.location.pathname === '/'
                     || window.location.pathname.endsWith('/');

    if (!isIndexPage) {
        // Entrée : le body apparaît en douceur
        document.body.classList.add('page-transition-in');

        // Sortie : on intercepte tous les liens internes
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            // On ne touche pas aux liens externes, ancres, téléchargements ou mailto
            if (
                !href.startsWith('http') &&
                !href.startsWith('#') &&
                !href.startsWith('mailto') &&
                !link.hasAttribute('download') &&
                !link.getAttribute('target')
            ) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.href;
                    document.body.classList.add('page-transition-out');
                    setTimeout(() => { window.location.href = target; }, 260);
                });
            }
        });
    }

});

// -----------------------------------------------
// 5. PRELOADER (uniquement index.html, une seule fois par session)
// -----------------------------------------------
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (!preloader) return; 

    // Vérifie si l'utilisateur a déjà vu le preloader pendant cette session
    if (!sessionStorage.getItem('preloaderVu')) {
        setTimeout(function () {
            preloader.classList.add('preloader-hidden');
            sessionStorage.setItem('preloaderVu', 'true'); // On marque comme vu
        }, 2000);
    } else {
        // Si déjà vu, on cache le preloader instantanément
        preloader.style.display = 'none';
        document.body.classList.add('page-transition-in');
    }
});

// -----------------------------------------------
// 6. PHOTOTHÈQUE — Modal agrandissement
// -----------------------------------------------
function openModal(imageSrc, captionText) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('modalCaption');
    if (!modal) return;
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    caption.innerHTML = captionText;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.style.display = 'none';
}

// Fermer avec la touche Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// -----------------------------------------------
// 7. CURSEURS LOGICIELS (fixes, page log_met.html)
// -----------------------------------------------
window.addEventListener('load', function () {
    const sliders = document.querySelectorAll('.software-slider');

    sliders.forEach(slider => {
        const val = parseInt(slider.value);
        const valId   = slider.id.replace('slider-', 'val-');
        const labelId = slider.id.replace('slider-', 'label-');
        const percentText = document.getElementById(valId);
        const labelText   = document.getElementById(labelId);

        if (percentText) percentText.innerText = val + '%';

        let color, labelStr;
        if (val < 35) {
            color = '#EF4444'; labelStr = 'Notions de base';
        } else if (val < 60) {
            color = '#F97316'; labelStr = 'Niveau intermédiaire';
        } else if (val < 80) {
            color = '#84CC16'; labelStr = 'Niveau avancé';
        } else {
            color = '#22C55E'; labelStr = 'Niveau expert';
        }

        if (labelText) { labelText.innerText = labelStr; labelText.style.color = color; }
        if (percentText) { percentText.style.color = color; }
        slider.style.background = `linear-gradient(to right, ${color} ${val}%, #E2E8F0 ${val}%)`;
    });
});
