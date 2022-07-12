import type { ARRCategoryColorSetting } from '../../main';

export default (colors: ARRCategoryColorSetting[]) => {
    const tabs = Object.fromEntries(
        Array.from(
            document.querySelectorAll<HTMLAnchorElement>('#aao-tabs li a')
        ).map(el => [el.textContent?.trim() ?? '', el])
    );
    colors.forEach(({ categoryName, bgColor, color }) => {
        const tab = tabs[categoryName];
        if (!tab) return;
        tab.style.setProperty('background-color', bgColor);
        tab.style.setProperty('color', color);
    });
};
