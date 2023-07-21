import type { RedesignParser } from 'typings/modules/Redesign';

export interface Mission {
    image: string;
    caption: string;
    id: number;
    type: string;
    adress: string;
    distance: string;
    list: 'alliance' | 'own';
    progress: {
        active: boolean;
        width: number;
    };
    patients: {
        current: number;
        total: number;
    };
    status: 'green' | 'red' | 'yellow';
}

export interface ShoreStation {
    id: number;
    caption: string;
    distance: string;
    home: boolean;
    state: 'danger' | 'success' | 'warning';
    list: 'alliance' | 'own';
}

export interface Hospital {
    caption: string;
    id: number;
    distance: string;
    freeBeds: number;
    department: boolean;
    state: 'danger' | 'success' | 'warning';
    list: 'alliance' | 'own';
    tax: number;
}

export interface Cell {
    caption: string;
    id: number;
    distance: string;
    freeCells: number;
    state: 'danger' | 'success' | 'warning';
    list: 'alliance' | 'own';
    tax: number;
}

export interface TowingVehicle {
    id: number;
    caption: string;
    distance: string;
    building: {
        id: number;
        caption: string;
        same: boolean;
    };
}

interface BaseVehicleWindow {
    id: number;
    building: {
        caption: string;
        id: number;
    };
    vehicleType: {
        caption: string;
        id: number;
        custom: boolean;
    };
    previousVehicle: number;
    nextVehicle: number;
    name: string;
    canMove: boolean;
    fms: number;
    maxStaff: number;
    mileage: string;
    image: string;
    user?: {
        name: string;
        id: number;
        online: boolean;
    };
    currentMission?: {
        caption: string;
        id: number;
    };
    followupMissions: {
        caption: string;
        id: number;
    }[];
    staff?: Record<string, string>;
    water?: string;
    foam?: string;
}

export interface MissionsWindow extends BaseVehicleWindow {
    windowType: 'missions';
    missions: {
        own: Mission[];
        alliance: Mission[];
    };
}

export type TransportRequestWindow = BaseVehicleWindow & {
    windowType: 'transportRequest';
    transportRequestType:
        | 'patient-intermediate'
        | 'patient'
        | 'prisoner-intermediate'
        | 'prisoner'
        | 'trailer';
} & (
        | {
              transportRequestType: 'patient-intermediate';
              buildings: {
                  own: ShoreStation[];
                  alliance: ShoreStation[];
              };
              releasable: boolean;
          }
        | {
              transportRequestType: 'patient';
              hospitals: {
                  own: Hospital[];
                  alliance: Hospital[];
              };
              loadAll: boolean;
              department: string;
              doctor: boolean;
              releasable: boolean;
          }
        | {
              transportRequestType: 'prisoner-intermediate';
              buildings: {
                  own: ShoreStation[];
                  alliance: ShoreStation[];
              };
              releasable: boolean;
          }
        | {
              transportRequestType: 'prisoner';
              cells: {
                  own: Cell[];
                  alliance: Cell[];
              };
              releasable: boolean;
          }
        | {
              transportRequestType: 'trailer';
              towingVehicles: TowingVehicle[];
          }
    );

export type EmptyVehicleWindow = BaseVehicleWindow & {
    windowType: 'empty';
};

export type VehicleWindow =
    | EmptyVehicleWindow
    | MissionsWindow
    | TransportRequestWindow;

export default <RedesignParser<VehicleWindow>>(({
    doc,
    href = '',
    getIdFromEl = () => -1,
}) => {
    const id = parseInt(
        new URL(href, window.location.origin).pathname.split('/')[2]
    );

    const buildingEl =
        doc.querySelector<HTMLAnchorElement>('#back_to_building');
    const building = {
        caption: buildingEl?.textContent?.trim() ?? '',
        id: getIdFromEl(buildingEl),
    };

    const vehicleTypeEl = doc.querySelector<HTMLAnchorElement>(
        '#vehicle-attr-type a[href^="/fahrzeugfarbe/"]'
    );
    const vehicleType = {
        caption: vehicleTypeEl?.textContent?.trim() ?? '',
        id: getIdFromEl(vehicleTypeEl),
        custom: vehicleTypeEl?.href?.includes('?') ?? false,
    };

    const [previousVehicle, nextVehicle] = Array.from(
        doc.querySelectorAll<HTMLAnchorElement>(
            '.btn-group.pull-right .btn.btn-xs[href^="/vehicles/"]'
        )
    ).map(btn => getIdFromEl(btn));

    const imageEl = doc.querySelector<HTMLImageElement>(
        'img.vehicle_image_reload[vehicle_type_id]'
    );
    const imgVehicleGraphicId = imageEl?.getAttribute('vehicle_graphic_id');
    const image =
        imageEl?.getAttribute('image_replace_allowed') === 'true'
            ? // parse the list of graphics for the used set and get the graphic
              (
                  JSON.parse(
                      doc.documentElement.innerHTML.match(
                          new RegExp(
                              `(?<=vehicle_graphics${
                                  imgVehicleGraphicId
                                      ? `_sorted\\[${imgVehicleGraphicId}]`
                                      : ''
                              }\\s*=\\s*)\\[(?:(?:\\[".*?",".*?","(?:true|false)"]|null),?)+]`
                          )
                      )?.[0] ?? '[]'
                  ) as [string, string, 'false' | 'true'][]
              )[vehicleType.id]?.[0] ??
              imageEl?.src ??
              ''
            : // no replacement? great! use the src attribute directly
              imageEl?.src ?? '';

    const userEl = doc.querySelector<HTMLAnchorElement>(
        '#vehicle_details a[href^="/profile/"]'
    );
    const user = userEl
        ? {
              name: userEl.textContent?.trim() ?? '',
              id: getIdFromEl(userEl),
              online: !!userEl.parentElement?.querySelector(
                  'img[src="/images/user_green.png"]'
              ),
          }
        : undefined;

    const currentMissionEl = doc.querySelector<HTMLAnchorElement>(
        '#vehicle-attr-current-mission a[href^="/missions/"]'
    );
    const currentMission = currentMissionEl
        ? {
              caption: currentMissionEl.textContent?.trim() ?? '',
              id: getIdFromEl(currentMissionEl),
          }
        : undefined;

    const followupMissions = Array.from(
        doc.querySelectorAll<HTMLAnchorElement>(
            '#vehicle_details h3 + ul li a[href^="/missions/"]'
        )
    ).map(el => ({
        caption: el.textContent?.trim() ?? '',
        id: getIdFromEl(el),
    }));

    const removeUndefined = <S>(value: S | null): value is S => !!value;

    const vehicle: BaseVehicleWindow = {
        id,
        building,
        vehicleType,
        previousVehicle,
        nextVehicle,
        name: doc.querySelector('h1')?.textContent ?? '',
        canMove: !!doc.querySelector('a[href$="/move"]'),
        fms: parseInt(
            doc
                .querySelector<HTMLSpanElement>('#vehicle-attr-fms span')
                ?.className?.match(/(?<=building_list_fms_)\d+/u)?.[0] ?? '-1'
        ),
        maxStaff: parseInt(
            doc.querySelector<HTMLDivElement>('#vehicle-attr-max-personnel')
                ?.textContent ?? '-1'
        ),
        mileage:
            doc.querySelector<HTMLDivElement>('#vehicle-attr-total-km')
                ?.textContent ?? '',
        image,
        user,
        currentMission,
        followupMissions,
        staff: Object.fromEntries(
            Array.from(
                doc.querySelectorAll<HTMLTableRowElement>(
                    '#vehicle-attr-personnel tbody tr'
                )
            ).map(({ children }) =>
                Array.from(children).map(({ textContent }) => textContent)
            )
        ),
        water:
            doc.querySelector<HTMLDivElement>('#vehicle-attr-water-amount')
                ?.textContent ?? undefined,
        foam:
            doc.querySelector<HTMLDivElement>('#vehicle-attr-foam-amount')
                ?.textContent ?? undefined,
    };

    // there are missions => return a vehicle with missions
    if (doc.querySelector('#mission_own')) {
        const mission_ids: number[] = [];

        const getMissionType = (el: HTMLElement) => {
            let type = el.dataset.missionType ?? '-1';
            const overlay = el.dataset.overlayIndex;
            const overlays = el.dataset.additiveOverlays;
            if (overlay) type += `-${overlay}`;
            if (overlays) type += `/${overlays}`;
            return type;
        };

        const getMissions = (
            rows: HTMLTableRowElement[],
            list: Mission['list']
        ) =>
            rows
                .map(row => {
                    const linkEl =
                        row.children[2]?.querySelector<HTMLAnchorElement>(
                            'a[href^="/missions/"]'
                        );
                    const progressEl =
                        row.children[4]?.querySelector<HTMLDivElement>(
                            '.progress .progress-bar'
                        );
                    const id = getIdFromEl(linkEl);
                    if (mission_ids.includes(id)) return null;
                    mission_ids.push(id);
                    return {
                        image: row.children[0]?.querySelector('img')?.src ?? '',
                        caption: linkEl?.textContent?.trim() ?? '',
                        id: getIdFromEl(linkEl),
                        type: getMissionType(row),
                        adress: Array.from(row.children[2]?.childNodes ?? [])
                            .map(c => (c as Text).wholeText ?? '')
                            .join('')
                            .trim(),
                        distance: row.children[3]?.textContent?.trim() ?? '',
                        list,
                        progress: {
                            active: !!progressEl?.querySelector(
                                '.progress-striped-inner-active'
                            ),
                            width: parseInt(progressEl?.style.width ?? '100'),
                        },
                        patients: {
                            current: parseInt(
                                row.children[5]?.textContent?.trim() ?? '-1'
                            ),
                            total: parseInt(
                                row.children[5]?.textContent
                                    ?.trim()
                                    ?.match(/\d+$/u)?.[0] ?? '-1'
                            ),
                        },
                        status:
                            (row.getAttribute('data-mission-status') as
                                | Mission['status']
                                | null) ?? 'red',
                    };
                })
                .filter(removeUndefined);

        const missionVehicle: VehicleWindow = {
            ...vehicle,
            windowType: 'missions',
            missions: {
                own: getMissions(
                    Array.from(doc.querySelectorAll('#mission_own tbody tr')),
                    'own'
                ),
                alliance: getMissions(
                    Array.from(
                        doc.querySelectorAll('#mission_alliance tbody tr')
                    ),
                    'alliance'
                ),
            },
        };
        return missionVehicle;
    }

    const transportRequestTypes = [
        'patient',
        'prisoner',
        'trailer',
        'patient-intermediate',
        'prisoner-intermediate',
    ];

    const transportRequestType =
        doc.querySelector<HTMLDivElement>(
            `[data-transport-request="true"]:where(${transportRequestTypes
                .map(type => `[data-transport-request-type="${type}"]`)
                .join(',')})`
        )?.dataset.transportRequestType ?? '';

    // workaround to have a safe type checking and assertion
    const isTransportRequest = (
        type: string
    ): type is TransportRequestWindow['transportRequestType'] =>
        transportRequestTypes.includes(transportRequestType);

    if (isTransportRequest(transportRequestType)) {
        const getHospitals = (list: Hospital['list']): Hospital[] => {
            return Array.from(
                doc.querySelectorAll<HTMLTableRowElement>(
                    `.col-md-9:first-of-type table#${list}-hospitals tbody tr`
                )
            )
                .map(row => {
                    if (row.children.length <= 1) return null;
                    const isOwn = list === 'own';
                    const alarmEl =
                        row.children[
                            isOwn ? 4 : 5
                        ].querySelector<HTMLAnchorElement>('a');
                    return {
                        caption:
                            (
                                (row.children[0] as HTMLElement | null)
                                    ?.firstChild as Text
                            )?.wholeText?.trim() ?? '',
                        id: getIdFromEl(alarmEl),
                        distance: row.children[1]?.textContent?.trim() ?? '',
                        freeBeds: parseInt(
                            row.children[2]?.textContent?.trim() ?? '-1'
                        ),
                        department: !!row.children[isOwn ? 3 : 4].querySelector(
                            '.label.label-success'
                        ),
                        list,
                        tax: isOwn
                            ? 0
                            : parseInt(
                                  row.children[3]?.textContent?.trim() ?? '-1'
                              ),
                        state: alarmEl?.classList.contains('btn-success')
                            ? 'success'
                            : alarmEl?.classList.contains('btn-warning')
                            ? 'warning'
                            : 'danger',
                    } as Hospital;
                })
                .filter(removeUndefined);
        };

        let transportRequestVehicle: TransportRequestWindow | null = null;
        if (transportRequestType === 'patient') {
            const departmentNode = doc.querySelector(
                '.col-md-9 .alert.alert-info b'
            );
            transportRequestVehicle = {
                ...vehicle,
                windowType: 'transportRequest',
                transportRequestType,
                hospitals: {
                    own: getHospitals('own'),
                    alliance: getHospitals('alliance'),
                },
                loadAll: !!doc.querySelector('a[href$="?load_all=true"]'),
                department: departmentNode?.textContent?.trim() ?? '',
                doctor: !!departmentNode?.nextSibling?.textContent?.trim()
                    .length,
                releasable: !!doc.querySelector('a[href$="/patient/-1"]'),
            };
        } else if (transportRequestType === 'prisoner') {
            const ownCells: Cell[] = [];
            const allianceCells: Cell[] = [];
            let list: Cell['list'] = 'own';
            doc.querySelectorAll<HTMLAnchorElement>(
                `.col-md-9 .alert-info > a[href^="/vehicles/${id}/gefangener/"]`
            ).forEach(cell => {
                if (cell.previousElementSibling?.matches('h5'))
                    list = 'alliance';
                const text = cell.textContent ?? '';
                const infos = text
                    .trim()
                    .match(
                        /(?<=\()[^(]*?\s(?<free>\d+),\s.*?\s(?<distance>\d+([,.]\d+)?\s(km|miles))(,\s.*?\s(?<tax>\d+)\s*%)?(?=\)$)/u
                    );
                const cellinfos: Cell = {
                    id: getIdFromEl(cell),
                    caption: text.replace(/\([^(]*?\)$/u, ''),
                    list,
                    state: cell.classList.contains('btn-success')
                        ? 'success'
                        : cell.classList.contains('btn-warning')
                        ? 'warning'
                        : 'danger',
                    freeCells: parseInt(infos?.groups?.free ?? '-1'),
                    distance: infos?.groups?.distance ?? '-1km',
                    tax:
                        list === 'own'
                            ? 0
                            : parseInt(infos?.groups?.tax ?? '-1'),
                };
                if (list === 'own') ownCells.push(cellinfos);
                else allianceCells.push(cellinfos);
            });
            transportRequestVehicle = {
                ...vehicle,
                windowType: 'transportRequest',
                transportRequestType,
                cells: {
                    own: ownCells,
                    alliance: allianceCells,
                },
                releasable: !!doc.querySelector(
                    'a[href^="/missions/"][href*="/gefangene/entlassen?vehicle_id="]'
                ),
            };
        } else if (transportRequestType === 'trailer') {
            transportRequestVehicle = {
                ...vehicle,
                windowType: 'transportRequest',
                transportRequestType,
                towingVehicles: Array.from(
                    doc
                        .querySelector<HTMLTableElement>('#vehicle_show_table')
                        ?.querySelectorAll<HTMLTableRowElement>('tbody tr') ??
                        []
                ).map(row => {
                    const building = row.children[3];
                    const buildingA =
                        building.querySelector<HTMLAnchorElement>('a');
                    return {
                        id: parseInt(
                            row.children[0]
                                .querySelector<HTMLAnchorElement>('a')
                                ?.href?.match(/\d+$/u)?.[0] ?? '-1'
                        ),
                        caption: row.children[1].textContent?.trim() ?? '',
                        distance: row.children[2].textContent?.trim() ?? '',
                        building: {
                            caption: buildingA?.textContent?.trim() ?? '',
                            id: getIdFromEl(buildingA),
                            same: !!building.querySelector<HTMLSpanElement>(
                                '.label.label-success'
                            ),
                        },
                    };
                }),
            };
        } else if (transportRequestType === 'patient-intermediate') {
            const getStations = (
                list: ShoreStation['list']
            ): ShoreStation[] => {
                return Array.from(
                    doc.querySelectorAll<HTMLTableRowElement>(
                        `.col-md-9:first-of-type table#${list}-intermediate-stations tbody tr`
                    )
                )
                    .map(row => {
                        if (row.children.length <= 1) return null;
                        const isOwn = list === 'own';
                        const alarmEl =
                            row.children[
                                isOwn ? 3 : 2
                            ].querySelector<HTMLAnchorElement>('a');
                        return {
                            caption:
                                (
                                    (row.children[0] as HTMLElement | null)
                                        ?.firstChild as Text
                                )?.wholeText?.trim() ?? '',
                            id: getIdFromEl(alarmEl),
                            list,
                            distance:
                                row.children[1]?.textContent?.trim() ?? '',
                            home: !!row.querySelector<HTMLSpanElement>(
                                '.label.label-info'
                            ),
                            state: alarmEl?.classList.contains('btn-success')
                                ? 'success'
                                : alarmEl?.classList.contains('btn-warning')
                                ? 'warning'
                                : 'danger',
                        } as ShoreStation;
                    })
                    .filter(removeUndefined);
            };
            transportRequestVehicle = {
                ...vehicle,
                windowType: 'transportRequest',
                transportRequestType,
                buildings: {
                    own: getStations('own'),
                    alliance: getStations('alliance'),
                },
                releasable: !!doc.querySelector('a[href$="/patient/-1"]'),
            };
        } else if (transportRequestType === 'prisoner-intermediate') {
            const ownStations: ShoreStation[] = [];
            const allianceStations: ShoreStation[] = [];
            let list: ShoreStation['list'] = 'own';
            doc.querySelectorAll<HTMLAnchorElement>(
                `.col-md-9 .alert-info > a[href^="/vehicles/${id}/gefangener/"]`
            ).forEach(station => {
                if (station.previousElementSibling?.matches('h5'))
                    list = 'alliance';
                const text = station.textContent ?? '';
                const infos = text
                    .trim()
                    .match(
                        /(?<=\()[^(].*?\s(?<distance>\d+([,.]\d+)?\s(km|miles))(?=\)$)/u
                    );
                const id = getIdFromEl(station);
                const stationInfos: ShoreStation = {
                    id,
                    caption: text.replace(/\([^(]*?\)$/u, ''),
                    list,
                    state: station.classList.contains('btn-success')
                        ? 'success'
                        : station.classList.contains('btn-warning')
                        ? 'warning'
                        : 'danger',
                    distance: infos?.groups?.distance ?? '-1km',
                    home: id === vehicle.building.id,
                };
                if (list === 'own') ownStations.push(stationInfos);
                else allianceStations.push(stationInfos);
            });
            transportRequestVehicle = {
                ...vehicle,
                windowType: 'transportRequest',
                transportRequestType,
                buildings: {
                    own: ownStations,
                    alliance: allianceStations,
                },
                releasable: !!doc.querySelector(
                    'a[href^="/missions/"][href*="/gefangene/entlassen?vehicle_id="]'
                ),
            };
        }
        if (transportRequestVehicle) return transportRequestVehicle;
    }

    // the vehicle is not owned by current player
    return { ...vehicle, windowType: 'empty' };
});
