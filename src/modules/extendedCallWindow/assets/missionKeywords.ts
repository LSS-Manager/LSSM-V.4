import type { Mission } from 'typings/Mission';

export default async (
    LSSM: Vue,
    settings: {
        keyword: string;
        color: string;
        autotextcolor: boolean;
        textcolor: string;
        prefix: boolean;
        missions: (number | string)[];
    }[]
): Promise<void> => {
    const missionTitle =
        document.querySelector<HTMLHeadingElement>('#missionH1');
    if (!missionTitle) return;

    const missionType = LSSM.$utils.getMissionTypeInMissionWindow();

    if (missionType === '-1') return;

    const mission = (
        LSSM.$store.getters['api/missionsById'] as Record<string, Mission>
    )[missionType];

    const addLabel = (
        text: string,
        color: string,
        autotextcolor: boolean,
        textcolor: string,
        prefix: boolean
    ) => {
        const label = document.createElement('span');
        label.classList.add('label');
        label.style.backgroundColor = color;
        const textNode = document.createElement('span');
        textNode.textContent = text
            .replace(/\{\{type\}\}/gu, missionType.toString())
            .replace(
                /\{\{credits\}\}/gu,
                (mission?.average_credits ?? 0).toLocaleString()
            );
        textNode.style.background = autotextcolor ? 'inherit' : 'transparent';
        textNode.style.backgroundClip = 'text';
        textNode.style.webkitBackgroundClip = 'text';
        textNode.style.color = autotextcolor ? 'transparent' : textcolor;
        textNode.style.filter = autotextcolor
            ? 'invert(1) grayscale(1) contrast(9)'
            : '';
        label.append(textNode);
        if (!prefix) missionTitle.append(label);
        else missionTitle.insertBefore(label, missionTitle.firstChild);
    };

    settings.forEach(s => {
        if (
            !s.missions.includes(-1) &&
            !s.missions.map(m => m.toString()).includes(missionType.toString())
        )
            return;
        addLabel(s.keyword, s.color, s.autotextcolor, s.textcolor, s.prefix);
    });
};
