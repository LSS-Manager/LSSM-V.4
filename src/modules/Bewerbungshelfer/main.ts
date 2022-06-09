import type { ModuleMainFunction } from 'typings/Module';
import type { ProfileWindow } from '../redesign/parsers/profile';
import type { RedesignParser } from 'typings/modules/Redesign';

/*
Der Bewerbungshelfer sollte folgendes am Ende können:
1. Einstellungsmöglichkeiten für die einzelnen Verbände ermöglichen, die nur durch die Admins verändert werden können
    - Eine Ablehnungsnachricht
    - Eine Creditgrenze (visuell über Farben dargestellt)
    - Eine individuelle Begrüßungsnachricht (auch, wenn schon systemseitig)
2. Das Profil des Bewerbers in der Zeile darstellen (Profilbild, Profilbeschreibung, Wachen als Hyperlinks, gesamt erspielte Credits)
*/

export default <ModuleMainFunction>(({ LSSM, MODULE_ID, $m, $mc }) => {
    document
        .querySelectorAll<HTMLAnchorElement>('a[href*="profile"]')
        .forEach(async profile => {
            const url = profile.getAttribute('href');
            const userProfile = await new Promise<ProfileWindow>(resolve =>
                LSSM.$store
                    .dispatch('api/request', {
                        url,
                        feature: MODULE_ID,
                    })
                    .then((res: Response) => res.text())
                    .then(html => {
                        const doc = new DOMParser().parseFromString(
                            html,
                            'text/html'
                        );
                        import(
                            /* webpackChunkName: "modules/redesign/parsers/profile" */ '../redesign/parsers/profile'
                        ).then(
                            async ({
                                default: parser,
                            }: {
                                default: RedesignParser<ProfileWindow>;
                            }) =>
                                resolve(
                                    await parser({
                                        href: url ?? '',
                                        doc,
                                        LSSM,
                                        $m,
                                        $mc,
                                        $sm: $m,
                                        $smc: $mc,
                                    })
                                )
                        );
                    })
            );
            const extrasSpan = document.createElement('span');
            profile.after(extrasSpan);

            extrasSpan.innerHTML += `<p style="color:limegreen;display:inline;margin-left:2em">${userProfile.credits.toLocaleString()} verdiente Credits</p>
                            <div class="glyphicon glyphicon-info-sign" style="display:inline;margin-left:2em;cursor:pointer"></div>
                            <div class="glyphicon glyphicon-user" style="display:inline;margin-left:2em;cursor:pointer"></div>`;

            const buildingHtml = userProfile.buildings.map(
                b =>
                    `<a href="/buildings/${b.id}" class="lightbox-open">${b.name}</a>`
            );
            extrasSpan.innerHTML += `<div class="hidden user_buildings">${buildingHtml.join(
                `<span style="color:red"> - </span>`
            )}</div>`;

            let userHtml = '';
            if (userProfile.image)
                userHtml += `<img src="${userProfile.image}" alt='profile image;'/>`;

            if (userProfile.text) {
                userHtml += `<p>${userProfile.text.replace(
                    /\n/gu,
                    '<br>'
                )}</p>`;
            }

            if (!userHtml) userHtml = 'keine Profilinformationen vorhanden!';
            extrasSpan.innerHTML += `<div class="hidden user_infos" style="display: flex">${userHtml}</div>`;
        });
    document.addEventListener('click', e => {
        const target = e.target;
        if (!target || !(target instanceof HTMLElement)) return;
        if (target.closest('.glyphicon-info-sign')) {
            target.parentElement
                ?.querySelector('.user_buildings')
                ?.classList.toggle('hidden');
        }
        if (target.closest('.glyphicon-user')) {
            target.parentElement
                ?.querySelector('.user_infos')
                ?.classList.toggle('hidden');
        }
    });
});
