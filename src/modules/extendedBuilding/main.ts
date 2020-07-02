import asyncButtons from './assets/asyncButtons';

((LSSM: Vue) => {
    if (
        !window.location.pathname.match(/^\/buildings\/\d+$/) ||
        document.querySelectorAll('[href*="profile"]').length
    )
        return;

    // Erstmal Leitstellen ausschließen
    if (!document.getElementById('ausbauten')) return;

    asyncButtons(LSSM);
})(window[PREFIX] as Vue);
