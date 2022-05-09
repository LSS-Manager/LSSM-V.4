import type { $m } from 'typings/Module';

type Table = 'atScene' | 'driving';
type List = 'players' | 'vehicles';

export default (
    LSSM: Vue,
    $m: $m,
    vehicleCounter: boolean,
    playerCounter: boolean,
    counterColors: Record<List, string>
) => {
    const amountOfPeopleSpan =
        document.querySelector<HTMLSpanElement>('#amount_of_people');

    if (!amountOfPeopleSpan) return;

    const vehicleRows: Record<Table, NodeListOf<HTMLTableRowElement>> = {
        driving: document.querySelectorAll<HTMLTableRowElement>(
            '#mission_vehicle_driving tbody tr'
        ),
        atScene: document.querySelectorAll<HTMLTableRowElement>(
            '#mission_vehicle_at_mission tbody tr'
        ),
    };

    const playerNameByUrl: Record<string, string> = {};

    const total: Record<List, Record<string, number>> = {
        vehicles: {},
        players: {},
    };
    const results: Record<Table, Record<List, Record<string, number>>> = {
        driving: {
            vehicles: {},
            players: {},
        },
        atScene: {
            vehicles: {},
            players: {},
        },
    };

    (<Table[]>['driving', 'atScene']).forEach(table =>
        vehicleRows[table].forEach(vehicle => {
            const res = results[table];
            if (vehicleCounter) {
                const list = res.vehicles;
                const vehicleType = vehicle
                    .querySelector<HTMLElement>('[vehicle_type_id]')
                    ?.getAttribute('vehicle_type_id');
                if (vehicleType) {
                    if (!list.hasOwnProperty(vehicleType))
                        list[vehicleType] = 0;
                    list[vehicleType]++;
                    if (!total.vehicles.hasOwnProperty(vehicleType))
                        total.vehicles[vehicleType] = 0;
                    total.vehicles[vehicleType]++;
                }
            }
            if (playerCounter) {
                const list = res.players;
                const player = vehicle.querySelector<HTMLAnchorElement>(
                    'a[href^="/profile/"]'
                );
                const url = player?.getAttribute('href');
                const name = player?.textContent?.trim();
                if (player && url && name) {
                    if (!playerNameByUrl.hasOwnProperty(url))
                        playerNameByUrl[url] = name;

                    if (!list.hasOwnProperty(url)) list[url] = 0;
                    list[url]++;
                    if (!total.players.hasOwnProperty(url))
                        total.players[url] = 0;
                    total.players[url]++;
                }
            }
        })
    );

    const sum = (object: Record<string, number>): number =>
        Object.values(object).reduce((a, b) => a + b, 0);
    const length = (object: Record<string, unknown>): number =>
        Object.keys(object).length;

    const addField = (list: List) => {
        const amountSpan = document.createElement('span');
        amountSpan.classList.add('amount_of_people_label');
        amountSpan.style.setProperty('margin-left', '0.5rem');
        const label = document.createElement('span');
        label.classList.add('label', `label-${counterColors[list]}`);
        label.style.setProperty('margin-left', '0.25rem');
        label.style.setProperty('position', 'relative');
        const countFun = { vehicles: sum, players: length }[list];
        label.textContent = `${countFun(
            results.driving[list]
        ).toLocaleString()}|${countFun(
            results.atScene[list]
        ).toLocaleString()}|${countFun(total[list]).toLocaleString()}`;
        label.style.setProperty('cursor', 'pointer');

        const caret = document.createElement('b');
        caret.classList.add('caret');

        const table = document.createElement('table');
        table.classList.add(
            'table-striped',
            'table-hover',
            'table-condensed',
            'hidden'
        );
        table.style.setProperty('position', 'absolute');
        table.style.setProperty('text-transform', 'none');
        table.style.setProperty('font-weight', 'normal');
        table.style.setProperty('border', '1px solid transparent');
        table.style.setProperty('border-radius', '4px');
        table.style.setProperty('box-shadow', '0 1px 2px rgba(0,0,0,.05)');
        table.style.setProperty('z-index', '3');
        table.style.setProperty('right', '0');
        table.style.setProperty('display', 'block');
        table.style.setProperty('max-height', 'calc(100vh - 100px)');
        table.style.setProperty('overflow', 'auto');
        const thead = document.createElement('thead');
        const theadRow = document.createElement('tr');
        [' ', 'driving', 'atScene', 'total'].forEach(title => {
            const th = document.createElement('th');
            if (title)
                th.textContent = $m(`vehiclePlayerCounter.${title}`).toString();
            theadRow.append(th);
        });
        thead.append(theadRow);

        const tbody = document.createElement('tbody');
        if (!LSSM.$store.state.darkmode)
            tbody.style.setProperty('color', 'black');
        Object.entries(total[list]).forEach(([row, total]) => {
            const trow = document.createElement('tr');
            const title = document.createElement('th');
            if (list === 'vehicles') {
                title.textContent = LSSM.$t(
                    `vehicles.${row}.caption`
                ).toString();
            } else if (list === 'players') {
                const player = document.createElement('a');
                player.classList.add('lightbox-open');
                player.setAttribute('href', row);
                player.textContent = playerNameByUrl[row];
                title.append(player);
            }
            const driving = document.createElement('td');
            driving.textContent = (
                results.driving[list][row] ?? 0
            ).toLocaleString();
            const atScene = document.createElement('td');
            atScene.textContent = (
                results.atScene[list][row] ?? 0
            ).toLocaleString();
            const sum = document.createElement('th');
            sum.textContent = total.toLocaleString();
            trow.append(title, driving, atScene, sum);
            tbody.append(trow);
        });

        table.append(thead, tbody);

        label.append(caret, table);

        label.addEventListener('click', () => table.classList.toggle('hidden'));

        amountSpan.append(
            document.createTextNode(
                $m(`vehiclePlayerCounter.${list}`).toString()
            ),
            label
        );

        amountOfPeopleSpan.append(amountSpan);
    };

    if (vehicleCounter) addField('vehicles');
    if (playerCounter) addField('players');
};
