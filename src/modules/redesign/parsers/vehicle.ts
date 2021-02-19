interface Mission {
    image: string;
    caption: string;
    id: number;
    adress: string;
    distance: string;
    list: 'mission_own' | 'mission_alliance';
    progress: {
        active: boolean;
        width: number;
    };
    patients: {
        current: number;
        total: number;
    };
}

export interface VehicleWindow {
    id: number;
    building: {
        caption: string;
        id: number;
    };
    vehicle_type: {
        caption: string;
        id: number;
        custom: boolean;
    };
    previous_vehicle_id: number;
    next_vehicle_id: number;
    vehicle_name: string;
    fms: number;
    max_staff: number;
    mileage: string;
    image: string;
    user?: {
        name: string;
        online: boolean;
        id: number;
    };
    current_mission?: {
        caption: string;
        id: number;
    };
    followup_missions: {
        caption: string;
        id: number;
    }[];
    staff?: Record<string, string>;
    water_amount?: string;
    mission_own: Mission[];
    mission_alliance: Mission[];
}

// TODO: Speech requests

export default (
    source: string,
    href: string,
    getIdFromEl: (el: HTMLAnchorElement | null) => number
): VehicleWindow => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const buildingEl = doc.querySelector<HTMLAnchorElement>(
        '#vehicle-attr-station a[href^="/buildings/"]'
    );
    const vehicleTypeEl = doc.querySelector<HTMLAnchorElement>(
        '#vehicle-attr-type a[href^="/fahrzeugfarbe/"]'
    );
    const navBtns = doc.querySelectorAll<HTMLAnchorElement>(
        '.btn-group.pull-right .btn.btn-xs[href^="/vehicles/"]'
    );
    const userEl = doc.querySelector<HTMLAnchorElement>(
        '#vehicle_details a[href^="/profile/"]'
    );
    const currentMissionEl = doc.querySelector<HTMLAnchorElement>(
        '#vehicle-attr-current-mission a[href^="/missions/"]'
    );
    const followUpMissionEls = doc.querySelectorAll<HTMLAnchorElement>(
        '#vehicle_details h3 + ul li a[href^="/missions/"]'
    );
    const vehicleType = getIdFromEl(vehicleTypeEl);
    const imageEl = doc.querySelector<HTMLImageElement>(
        'img.vehicle_image_reload[vehicle_type_id]'
    );
    return {
        id: parseInt(
            new URL(href, window.location.href).pathname.match(
                /\d+\/?$/
            )?.[0] ?? '-1'
        ),
        building: {
            caption: buildingEl?.textContent ?? '',
            id: getIdFromEl(buildingEl),
        },
        vehicle_type: {
            caption: vehicleTypeEl?.textContent ?? '',
            id: vehicleType,
            custom: vehicleTypeEl?.href?.includes('?') ?? false,
        },
        previous_vehicle_id: getIdFromEl(navBtns[0]),
        next_vehicle_id: getIdFromEl(navBtns[1]),
        vehicle_name: doc.querySelector('h1')?.textContent ?? '',
        fms: parseInt(
            doc
                .querySelector<HTMLSpanElement>('#vehicle-attr-fms span')
                ?.className?.match(/(?<=building_list_fms_)\d+/)?.[0] ?? '-1'
        ),
        max_staff: parseInt(
            doc.getElementById('vehicle-attr-max-personnel')?.textContent ??
                '-1'
        ),
        mileage: doc.getElementById('vehicle-attr-total-km')?.textContent ?? '',
        image:
            imageEl?.getAttribute('image_replace_allowed') === 'true'
                ? JSON.parse(
                      doc.scripts[userEl ? 7 : 8].innerText.match(
                          /(?<=vehicle_graphics\s*=\s*)\[(?:\[".*?",".*?","(true|false)"],?)+]/
                      )?.[0] ?? '[]'
                  )[vehicleType][0]
                : imageEl?.src ?? '',
        user: userEl
            ? {
                  name: userEl.textContent ?? '',
                  id: getIdFromEl(userEl),
                  online:
                      (userEl?.previousElementSibling as HTMLImageElement | null)?.src?.endsWith(
                          '/images/user_green.png'
                      ) ?? false,
              }
            : undefined,
        current_mission: currentMissionEl
            ? {
                  caption: currentMissionEl?.textContent ?? '',
                  id: getIdFromEl(currentMissionEl),
              }
            : undefined,
        followup_missions: Array.from(followUpMissionEls).map(m => ({
            id: getIdFromEl(m),
            caption: m.textContent ?? '',
        })),
        staff: Object.fromEntries(
            Array.from(
                doc.querySelectorAll<HTMLTableRowElement>(
                    '#vehicle-attr-personnel tbody tr'
                )
            ).map(({ children }) =>
                Array.from(children).map(({ textContent }) => textContent)
            )
        ),
        water_amount:
            doc.getElementById('vehicle-attr-water-amount')?.textContent ??
            undefined,
        ...(Object.fromEntries(
            ['mission_own', 'mission_alliance'].map(list => [
                list,
                Array.from(
                    doc.querySelectorAll<HTMLTableRowElement>(
                        `#${list} tbody tr`
                    )
                ).map(m => {
                    const linkEl = m.children[1]?.querySelector<
                        HTMLAnchorElement
                    >('a[href^="/missions/"]');
                    const progressEl = m.children[3]?.querySelector<
                        HTMLDivElement
                    >('.progress .progress-bar');
                    return {
                        image: m.children[0]?.querySelector('img')?.src ?? '',
                        caption: linkEl?.textContent?.trim() ?? '',
                        id: getIdFromEl(linkEl),
                        adress: Array.from(m.children[1]?.childNodes ?? [])
                            .map(c => (c as Text).wholeText ?? '')
                            .join('')
                            .trim(),
                        distance: m.children[2]?.textContent?.trim() ?? '',
                        list,
                        progress: {
                            active: !!progressEl?.querySelector(
                                '.progress-striped-inner-active'
                            ),
                            width: parseInt(progressEl?.style.width ?? '100'),
                        },
                        patients: {
                            current: parseInt(
                                m.children[4]?.textContent?.trim() ?? '-1'
                            ),
                            total: parseInt(
                                m.children[4]?.textContent
                                    ?.trim()
                                    ?.match(/\d+$/)?.[0] ?? '-1'
                            ),
                        },
                    };
                }),
            ])
        ) as { mission_own: Mission[]; mission_alliance: Mission[] }),
    };
};
