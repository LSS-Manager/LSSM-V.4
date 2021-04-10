import { RedesignParser } from 'typings/modules/Redesign';

interface Mission {
    image: string;
    caption: string;
    id: number;
    type: number;
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
    status: 'red' | 'yellow' | 'green';
}

interface Hospital {
    caption: string;
    id: number;
    distance: string;
    beds: number;
    department: boolean;
    state: 'success' | 'danger' | 'warning';
    list: 'own_hospitals' | 'alliance_hospitals';
    tax: number;
}

interface Cell {
    caption: string;
    id: number;
    distance: string;
    free: number;
    state: 'success' | 'danger' | 'warning';
    list: 'own_cells' | 'alliance_cells';
    tax: number;
}

interface WLF {
    id: number;
    caption: string;
    distance: string;
    building: {
        id: number;
        caption: string;
        same: boolean;
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
    can_move: boolean;
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
    has_hospitals: boolean;
    own_hospitals: Hospital[];
    alliance_hospitals: Hospital[];
    load_all_hospitals: boolean;
    hospital_department: string;
    patient_releaseable: boolean;
    has_cells: boolean;
    own_cells: Cell[];
    alliance_cells: Cell[];
    prisoners_releaseable: boolean;
    has_wlfs: boolean;
    wlfs: WLF[];
    authenticity_token: string;
}

export default <RedesignParser<VehicleWindow>>((source, href, getIdFromEl) => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const id = parseInt(
        new URL(href, window.location.href).pathname.match(/\d+\/?$/)?.[0] ??
            '-1'
    );
    const fms = parseInt(
        doc
            .querySelector<HTMLSpanElement>('#vehicle-attr-fms span')
            ?.className?.match(/(?<=building_list_fms_)\d+/)?.[0] ?? '-1'
    );
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
    const hasHospitals = !!doc.querySelector<HTMLAnchorElement>(
        'a[href$="/patient/-1"]'
    );
    const hasCells = !!doc.querySelector<HTMLAnchorElement>(
        `a[href^="/vehicles/${id}/gefangener/"]`
    );
    const own_cells: Cell[] = [];
    const alliance_cells: Cell[] = [];
    if (hasCells) {
        let list: 'own_cells' | 'alliance_cells' = 'own_cells';
        doc.querySelectorAll<HTMLAnchorElement>(
            `.col-md-9 .alert-info > a[href^="/vehicles/${id}/gefangener/"]`
        ).forEach(cell => {
            if (cell.previousElementSibling?.matches('h5'))
                list = 'alliance_cells';
            const text = cell.textContent ?? '';
            const infos = (text.match(/(?<=\()[^(]*?(?=\)$)/)?.[0] ?? '').split(
                ':'
            );
            const cellinfos: Cell = {
                id: getIdFromEl(cell),
                caption: text.replace(/\([^(]*?\)$/, ''),
                list,
                state: cell.classList.contains('btn-success')
                    ? 'success'
                    : cell.classList.contains('btn-warning')
                    ? 'warning'
                    : 'danger',
                free: parseInt(infos[1].trim()),
                distance: infos[2].split(/,(?=\s)/)[0].trim(),
                tax:
                    list === 'own_cells'
                        ? 0
                        : parseInt(infos[3].match(/\d+(?=%)/)?.[0] ?? '-1'),
            };
            if (list === 'own_cells') own_cells.push(cellinfos);
            else alliance_cells.push(cellinfos);
        });
    }
    const wlf_table = doc.querySelector<HTMLTableElement>(
        '#vehicle_show_table'
    );
    // because missions may appear in own and alliance lists
    const mission_ids: number[] = [];
    return {
        id,
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
        can_move: !!doc.querySelector('a[href$="/move"]'),
        fms,
        max_staff: parseInt(
            doc.getElementById('vehicle-attr-max-personnel')?.textContent ??
                '-1'
        ),
        mileage: doc.getElementById('vehicle-attr-total-km')?.textContent ?? '',
        image:
            imageEl?.getAttribute('image_replace_allowed') === 'true' &&
            doc.documentElement.innerHTML.match(
                /vehicle_graphics(_sorted\[\d+])?\s*=\s*/
            )
                ? JSON.parse(
                      Array.from(doc.scripts)
                          .find(({ innerText }) =>
                              innerText.match(/vehicle_graphics/)
                          )
                          ?.innerText.match(
                              /(?<=vehicle_graphics(_sorted\[\d+])?\s*=\s*)\[(?:(?:(?:\[".*?",".*?","(?:true|false)"])|null),?)+]/
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
                )
                    .map(m => {
                        const linkEl = m.children[1]?.querySelector<
                            HTMLAnchorElement
                        >('a[href^="/missions/"]');
                        const progressEl = m.children[3]?.querySelector<
                            HTMLDivElement
                        >('.progress .progress-bar');
                        const id = getIdFromEl(linkEl);
                        if (mission_ids.includes(id)) return null;
                        mission_ids.push(id);
                        return {
                            image:
                                m.children[0]?.querySelector('img')?.src ?? '',
                            caption: linkEl?.textContent?.trim() ?? '',
                            id: getIdFromEl(linkEl),
                            type: parseInt(
                                m.getAttribute('data-mission-type') ?? '-1'
                            ),
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
                                width: parseInt(
                                    progressEl?.style.width ?? '100'
                                ),
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
                            status:
                                m.getAttribute('data-mission-status') ?? 'red',
                        };
                    })
                    .filter(m => !!m),
            ])
        ) as { mission_own: Mission[]; mission_alliance: Mission[] }),
        has_hospitals: hasHospitals,
        ...(Object.fromEntries(
            ['own_hospitals', 'alliance_hospitals'].map((key, index) => [
                key,
                hasHospitals
                    ? Array.from(
                          doc.querySelectorAll<HTMLTableRowElement>(
                              `.col-md-9:first-of-type table:nth-of-type(${index +
                                  1}) tbody tr`
                          )
                      )
                          .map(h => {
                              if (h.children.length <= 1) return null;
                              const isOwn = key === 'own_hospitals';
                              const alarmEl = h.children[
                                  isOwn ? 4 : 5
                              ].querySelector<HTMLAnchorElement>('a');
                              return {
                                  caption:
                                      ((h.children[0] as HTMLElement | null)
                                          ?.firstChild as Text)?.wholeText?.trim() ??
                                      '',
                                  distance:
                                      h.children[1]?.textContent?.trim() ?? '',
                                  beds: parseInt(
                                      h.children[2]?.textContent?.trim() ?? '-1'
                                  ),
                                  department: !!h.children[
                                      isOwn ? 3 : 4
                                  ].querySelector('.label.label-success'),
                                  id: getIdFromEl(alarmEl),
                                  list: key,
                                  tax: isOwn
                                      ? 0
                                      : parseInt(
                                            h.children[3]?.textContent?.trim() ??
                                                '-1'
                                        ),
                                  state: alarmEl?.classList.contains(
                                      'btn-success'
                                  )
                                      ? 'success'
                                      : alarmEl?.classList.contains(
                                            'btn-warning'
                                        )
                                      ? 'warning'
                                      : 'danger',
                              };
                          })
                          .filter(h => !!h)
                    : [],
            ])
        ) as {
            own_hospitals: Hospital[];
            alliance_hospitals: Hospital[];
        }),
        load_all_hospitals: !!doc.querySelector<HTMLAnchorElement>(
            'a[href$="?load_all=true"]'
        ),
        hospital_department: hasHospitals
            ? doc
                  .querySelector('.col-md-9 .alert.alert-info b')
                  ?.textContent?.trim() ?? ''
            : '',
        patient_releaseable: !!doc.querySelector('a[href$="/patient/-1"]'),
        has_cells: hasCells,
        own_cells,
        alliance_cells,
        prisoners_releaseable: !!doc.querySelector(
            'a[href$="/gefangene/entlassen"]'
        ),
        has_wlfs: !!wlf_table,
        wlfs: wlf_table
            ? Array.from(
                  wlf_table.querySelectorAll<HTMLTableRowElement>('tbody tr')
              ).map(wlf => {
                  const building = wlf.children[3];
                  const buildingA = building.querySelector<HTMLAnchorElement>(
                      'a'
                  );
                  return {
                      id: parseInt(
                          wlf.children[0]
                              .querySelector<HTMLAnchorElement>('a')
                              ?.href?.match(/\d+$/)?.[0] ?? '-1'
                      ),
                      caption: wlf.children[1].textContent?.trim() ?? '',
                      distance: wlf.children[2].textContent?.trim() ?? '',
                      building: {
                          caption: buildingA?.textContent?.trim() ?? '',
                          id: getIdFromEl(buildingA),
                          same: !!building.querySelector<HTMLSpanElement>(
                              '.label.label-success'
                          ),
                      },
                  };
              })
            : [],
        authenticity_token:
            doc.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
                ?.content ?? '',
    };
});
