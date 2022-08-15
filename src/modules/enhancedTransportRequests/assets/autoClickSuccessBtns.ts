export default () => {
    const vehicleBtn = document.querySelector<HTMLAnchorElement>(
        '#next-vehicle-fms-5'
    );
    if (vehicleBtn) return vehicleBtn.click();
    if (window.location.pathname.match(/^\/vehicles\/\d+\/?$/u)) return;
    const missionBtn = document.querySelector<HTMLAnchorElement>(
        'a.btn.btn-success[href^="/missions/"]'
    );
    if (missionBtn) return missionBtn.click();
    window.tellParent('lightboxClose();');
};
