export function getCityFromAddress(address: string) {
    const addressSplit = address.split(',');
    return addressSplit[addressSplit.length - 1]?.trim() ?? '–';
}

export function removeZipFromCity(city: string) {
    return city
        .replace(
            // matches all Zip-styles of the countries supported by LSSM
            /^((\d{4} ?[A-Z]{2})|((\d{4}|\d{2})[ -]\d{3})|(\d{3} \d{2})|\d+|([A-Z0-9]{2,4} [A-Z0-9]{3}))/,
            ''
        )
        .trim();
}

export function addHoursToNow(hours: number): Date {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export function dateToTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
}

export function getTimeReplacers(): Record<
    string,
    (match: string, ...groups: string[]) => string
> {
    return {
        [/now\+(\d+(?:[.,]\d+)?)/.toString()]: (match, additive) =>
            dateToTime(addHoursToNow(parseFloat(additive))),
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
}

export function shareMission(
    LSSM: Vue,
    missionId: string | number,
    isCallList = false
) {
    return LSSM.$store.dispatch('api/request', {
        url: `/missions/${missionId}/alliance`,
        feature: `'sap-${isCallList ? 'ecl-' : ''}share-missions'`,
    });
}

export function sendReply(
    LSSM: Vue,
    missionId: string | number,
    message: string,
    post: boolean,
    authToken: string,
    isCallList = false
) {
    const url = new URL('/mission_replies', window.location.origin);
    url.searchParams.append('utf8', '✓');
    url.searchParams.append('authenticity_token', authToken);
    url.searchParams.append('mission_reply[alliance_chat]', '0');
    if (post) url.searchParams.append('mission_reply[alliance_chat]', '1');

    url.searchParams.append('mission_reply[content]', message);
    url.searchParams.append('mission_reply[mission_id]', missionId.toString());
    return LSSM.$store.dispatch('api/request', {
        url: '/mission_replies',
        feature: `sap${isCallList ? '-ecl' : ''}_reply`,
        init: {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: url.searchParams.toString(),
            method: 'POST',
            mode: 'cors',
        },
    });
}
