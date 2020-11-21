export default (
    LSSM: Vue,
    settings: {
        keyword: string;
        color: string;
        prefix: boolean;
        missions: (string | number)[];
    }[]
): void => {
    const missionHelpBtn = document.getElementById('mission_help');
    const missionTitle = document.getElementById('missionH1');
    if (!missionHelpBtn || !missionTitle) return;
    const missionType = parseInt(
        missionHelpBtn
            ?.getAttribute('href')
            ?.match(/(?!^\/einsaetze\/)\d+/)?.[0] || '-1'
    );
    if (missionType < 0) return;

    const addLabel = (text: string, color: string, prefix: boolean) => {
        const label = document.createElement('span');
        label.classList.add('label');
        label.style.backgroundColor = color;
        const textNode = document.createElement('span');
        textNode.textContent = text;
        textNode.style.background = 'inherit';
        textNode.style.backgroundClip = 'text';
        textNode.style.webkitBackgroundClip = 'text';
        textNode.style.color = 'transparent';
        textNode.style.filter = 'invert(1) grayscale(1) contrast(9)';
        label.appendChild(textNode);
        if (!prefix) missionTitle.appendChild(label);
        else missionTitle.insertBefore(label, missionTitle.firstChild);
    };

    settings.forEach(s => {
        if (!s.missions.map(m => m.toString()).includes(missionType.toString()))
            return;
        addLabel(s.keyword, s.color, s.prefix);
    });
};
