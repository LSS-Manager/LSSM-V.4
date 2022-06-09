/*
Der Bewerbungshelfer sollte folgendes am Ende können:
1. Einstellungsmöglichkeiten für die einzelnen Verbände ermöglichen, die nur durch die Admins verändert werden können
    - Eine Ablehnungsnachricht
    - Eine Creditgrenze (visuell über Farben dargestellt)
    - Eine individuelle Begrüßungsnachricht (auch, wenn schon systemseitig)
2. Das Profil des Bewerbers in der Zeile darstellen (Profilbild, Profilbeschreibung, Wachen als Hyperlinks, gesamt erspielte Credits)
*/
/*global $*/

(async() => {
    'use strict';

    function getBuildingMarker(htmlData) {
        const returnValue = [];
        for (const htmlDatum of htmlData) {
            if (htmlDatum.innerHTML.includes('buildingMarkerAdd')) {
                const regexDatabase = htmlDatum.innerHTML,
                    regExpression = /buildingMarkerAdd\((?<obj>\{.+\})/gu;
                var match;
                while ((match = regExpression.exec(regexDatabase)))
                    returnValue.push(JSON.parse(match.groups.obj));

                break;
            }
        }
        return returnValue;
    }

    $('a[href*="profile"]').each(async function() {
        const $this = $(this);
        const candidatureId = Number($this.attr('href').replace(/\D+/g, ''));
        let totalCredits = 0;
        $this.parent().parent('tr').attr('id', `table_${ candidatureId }`);
        await $.get($this.attr('href'), data => {
            totalCredits = parseInt(
                $('h1', data)
                .siblings('br')[0]
                .nextSibling.textContent.replace(/\D+/g, '')
            );
            const userBuildings = getBuildingMarker($('script', data));
            $this.after(`<p style="color:limegreen;display:inline;margin-left:2em">${ totalCredits.toLocaleString() } verdiente Credits</p>
                            <div class="glyphicon glyphicon-info-sign" style="display:inline;margin-left:2em;cursor:pointer" id="info_${ candidatureId }"></div>
                            <div class="glyphicon glyphicon-user" style="display:inline;margin-left:2em;cursor:pointer" id="profile_${ candidatureId }"></div>
                            <div class="hidden" id="profileInfo_${ candidatureId }"></div>
                            <div class="hidden" id="buildings_${ candidatureId }"></div>`);
            for (let i = 0; i < userBuildings.length; i++) {
                const e = userBuildings[i],
                    buildingHtml = `<a href="/buildings/${ e.id }" class="lightbox-open">${ e.name }</a>`;
                if (i != userBuildings.length - 1) {
                    $(`#buildings_${ candidatureId }`).append(
                        `${ buildingHtml }<span style="color:red"> - </span>`
                    );
                } else {
                    $(`#buildings_${ candidatureId }`).append(buildingHtml);
                }
            }
            if ($('.profile_avatar', data)[0]) {
                $(`#profileInfo_${ candidatureId }`).append(
                    $('.profile_avatar', data)[0].outerHTML
                );
            }

            if ($('#profile_text_photo', data)[0]) {
                $(`#profileInfo_${ candidatureId }`).append(
                    $('#profile_text_photo', data).text().trim()
                );
            }

            if (
                (!$('.profile_avatar', data)[0] ||
                    $('.profile_avatar', data).length === 0) &&
                (!$('#profile_text_photo', data)[0] ||
                    !$('#profile_text_photo', data).text().trim())
            ) {
                $(`#profileInfo_${ candidatureId }`).append(
                    'Keine Profilinformationen verfügbar.'
                );
            }
        });
    });

    $('body').on('click', '.glyphicon-info-sign', function() {
        const toggleId = $(this).attr('id').replace('info_', '');
        $(`#buildings_${ toggleId }`).toggleClass('hidden');
    });

    $('body').on('click', '.glyphicon-user', function() {
        const toggleId = $(this).attr('id').replace('profile_', '');
        $(`#profileInfo_${ toggleId }`).toggleClass('hidden');
    });
})();