// Attendre que le document soit chargé
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Gestion de l'animation au Scroll (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150; // Distance avant que l'élément apparaisse

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Écouter l'événement scroll
    window.addEventListener('scroll', revealOnScroll);
    // Déclencher une fois au chargement pour les éléments déjà visibles
    revealOnScroll();


    // --- 2. Menu Burger pour Mobile (Optionnel mais pro) ---
    // (J'ai ajouté le bouton burger dans le HTML pour le futur)
    
    // --- 3. Effet Parallax doux sur le Hero (Optionnel) ---
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        if(scrollValue < 700) {
            heroContent.style.transform = `translateY(${scrollValue * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollValue / 700);
        }
    });

});