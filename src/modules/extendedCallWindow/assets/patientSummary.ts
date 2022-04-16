import type { $m } from 'typings/Module';

export default (LSSM: Vue, $m: $m): void => {
    const patientIcon = document.querySelector(
        '.patientPrisonerIcon[src*="patient"]'
    );
    if (!patientIcon) return;

    LSSM.$store.commit('useFontAwesome');

    const requirements = {} as Record<string, number>;
    Array.from(document.querySelectorAll('.mission_patient .alert-danger'))
        .flatMap(alert =>
            (alert.textContent?.replace(/^[^:]*:/u, '').trim() || '')
                .split(',')
                .map(req => req.trim())
        )
        .filter(Boolean)
        .forEach(req => {
            if (!requirements.hasOwnProperty(req)) requirements[req] = 0;
            requirements[req]++;
        });

    const oncePerMission: string[] = Object.values(
        $m('patientSummary.oncePerMission')
    );

    const reqStr = Object.entries(requirements)
        .map(
            ([req, amount]) =>
                `${req}: ${(oncePerMission.includes(req)
                    ? 1
                    : amount
                ).toLocaleString()}`
        )
        .sort()
        .join(', ');

    if (!reqStr.length) return;

    patientIcon.insertAdjacentHTML(
        'afterend',
        `&nbsp;|&nbsp;<i class="fas fa-user-injured"></i>&nbsp;${reqStr}`
    );
};
