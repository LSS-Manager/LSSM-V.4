import { Mission } from 'typings/Mission';
import { ModuleMainFunction } from 'typings/Module';

interface Message {
    name: string;
    message: string;
    postInChat: boolean;
}

export default <ModuleMainFunction>(async ({ LSSM, MODULE_ID, getSetting }) => {
    await LSSM.$store.dispatch('api/getMissions', { feature: MODULE_ID });

    const messages = (
        await getSetting<{ value: Message[]; enabled: boolean }>('messages')
    ).value;

    const missionHelpBtn = document.getElementById('mission_help');
    let missionType =
        missionHelpBtn
            ?.getAttribute('href')
            ?.match(/(?!^\/einsaetze\/)\d+/)?.[0] || '-1';
    if (missionType !== '-1') {
        const overlayIndex =
            document
                .getElementById('mission_general_info')
                ?.getAttribute('data-overlay-index') ?? 'null';
        if (overlayIndex && overlayIndex !== 'null')
            missionType += `-${overlayIndex}`;
        const additionalOverlay =
            document
                .getElementById('mission_general_info')
                ?.getAttribute('data-additive-overlays') ?? 'null';
        if (additionalOverlay && additionalOverlay !== 'null')
            missionType += `/${additionalOverlay}`;
    }
    const mission = (
        LSSM.$store.getters['api/missionsById'] as Record<string, Mission>
    )[missionType];

    const addHoursToNow = (hours: number): Date =>
        new Date(Date.now() + hours * 60 * 60 * 1000);

    const averageCredits = mission?.average_credits?.toLocaleString() ?? '–';
    const patients = document
        .querySelectorAll('.mission_patient')
        .length.toLocaleString();
    const remainingVehicles =
        document
            .querySelector<HTMLDivElement>('#missing_text')
            ?.textContent?.trim()
            .replace(/^.*?:/, '')
            .trim() ?? '';

    const variables: Record<
        string,
        (match: string, ...groups: string[]) => string
    > = {
        credits: () => averageCredits,
        patients: () => patients,
        remaining: () => remainingVehicles,
        [/now\+(\d+(?:[.,]\d+)?)/.toString()]: (match, additive) => {
            const resultDate = addHoursToNow(parseFloat(additive));
            return `${resultDate
                .getHours()
                .toString()
                .padStart(2, '0')}:${resultDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}`;
        },
        [/now\+(\d+(?:[.,]\d+)?)r(-?\d+)/.toString()]: (
            match,
            additive,
            round
        ) => {
            const resultDate = addHoursToNow(parseFloat(additive));
            const roundTo = Math.abs(parseInt(round)) % 60;
            const roundUp = !round.startsWith('-');
            let resultHours = resultDate.getHours();
            let resultMinutes = resultDate.getMinutes();
            if (!roundTo) {
                resultMinutes = 0;
                if (roundUp) resultHours++;
            } else {
                if (roundUp)
                    resultMinutes += roundTo - (resultMinutes % roundTo);
                else resultMinutes -= resultMinutes % roundTo;
            }
            resultHours += Math.floor(resultMinutes / 60);
            resultMinutes %= 60;
            resultHours %= 24;
            if (resultHours < 0) resultHours = 24 + resultHours;
            if (resultMinutes < 0) resultMinutes = 60 + resultMinutes;
            return `${resultHours.toString().padStart(2, '0')}:${resultMinutes
                .toString()
                .padStart(2, '0')}`;
        },
    };

    // phone-alt, share-alt, comment-dots, arrow-alt-circle-right

    const modifiedMessages = messages.map(m => {
        let message = m.message;
        Object.entries(variables).forEach(([variable, replacer]) => {
            if (variable.startsWith('/') && variable.endsWith('/')) {
                message = message.replace(
                    new RegExp(`{{${variable.replace(/^\/|\/$/g, '')}}}`, 'g'),
                    replacer
                );
            } else {
                message = message.replaceAll(`{{${variable}}}`, replacer);
            }
        });
        return { ...m, message };
    });

    console.log(messages, modifiedMessages);
});
