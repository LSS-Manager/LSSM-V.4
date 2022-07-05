export default () => {
    const vehicleBtn = document.querySelector<HTMLAnchorElement>(
        'a.btn.btn-success[href^="/vehicles/"]'
    );
    if (vehicleBtn) return vehicleBtn.click();
    const missionBtn = document.querySelector<HTMLAnchorElement>(
        'a.btn.btn-success[href^="/missions/"]'
    );
    if (missionBtn) return missionBtn.click();
    window.tellParent('lightboxClose();');
};
