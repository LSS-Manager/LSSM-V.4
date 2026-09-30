import type { $m } from 'typings/Module';

type ActivityState =
    | 'blue'
    | 'gray'
    | 'green'
    | 'red'
    | 'unknown'
    | 'yellow';

type SortType = 'activity' | 'default' | 'name' | 'role';

interface Member {
    activity: ActivityState;
    id: string;
    name: string;
    order: number;
    roles: string[];
    row: HTMLTableRowElement;
}

const NO_ROLE = '__lssm_no_role__';

const findMemberTable = (doc: Document): HTMLTableElement | null =>
    Array.from(doc.querySelectorAll<HTMLTableElement>('table')).find(table =>
        table.querySelector('tbody a[href^="/profile/"]')
    ) ?? null;

const getMemberBody = (table: HTMLTableElement): HTMLTableSectionElement | null =>
    Array.from(table.tBodies).at(-1) ?? null;

const getLastPage = (doc: Document): number => {
    const penultimateItem = doc.querySelector<HTMLElement>(
        '.pagination.pagination li:nth-last-of-type(2)'
    );
    const lastPage = Number.parseInt(
        penultimateItem?.textContent?.trim() ?? '1'
    );

    if (Number.isFinite(lastPage) && lastPage > 0) return lastPage;

    const pageNumbers = Array.from(
        doc.querySelectorAll<HTMLAnchorElement>('.pagination a')
    )
        .map(link => Number.parseInt(link.textContent?.trim() ?? '0'))
        .filter(Number.isFinite);

    return Math.max(1, ...pageNumbers);
};

const getActivity = (row: HTMLTableRowElement): ActivityState =>
    (row
        .querySelector<HTMLImageElement>('img.online_icon')
        ?.src.match(/user_(?<activity>blue|gray|green|red|yellow)\.png/u)?.groups
        ?.activity as ActivityState | undefined) ?? 'unknown';

const getRoles = (row: HTMLTableRowElement): string[] =>
    (row.cells.item(1)?.querySelector('small')?.textContent ?? '')
        .split(',')
        .map(role => role.trim())
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));

const parseMember = (
    row: HTMLTableRowElement,
    page: number,
    index: number
): Member | null => {
    const profile = row.querySelector<HTMLAnchorElement>('a[href^="/profile/"]');
    if (!profile) return null;

    const { pathname, textContent } = profile;
    const name = textContent?.trim() ?? '';
    if (!name) return null;

    return {
        activity: getActivity(row),
        id:
            pathname.match(/^\/profile\/(?<id>\d+)/u)?.groups?.id ??
            pathname,
        name,
        order: page * 10_000 + index,
        roles: getRoles(row),
        row,
    };
};

const createOption = (value: string, text: string): HTMLOptionElement => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
};

export default (LSSM: Vue, $m: $m, MODULE_ID: string): void => {
    const table = findMemberTable(document);
    const tbody = table && getMemberBody(table);
    if (
        !table ||
        !tbody ||
        document.getElementById(`${MODULE_ID}-controls`)
    )
        return;

    const currentUrl = new URL(window.location.href);
    const pageFromUrl = Number.parseInt(
        currentUrl.searchParams.get('page') ?? '1'
    );
    const currentPage =
        Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;
    const totalPages = getLastPage(document);
    const pagination = document.querySelector<HTMLElement>(
        '.pagination.pagination'
    );
    const loadedPages = new Set<number>([currentPage]);
    const members = new Map<string, Member>();
    const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
    });

    Array.from(tbody.rows).forEach((row, index) => {
        const member = parseMember(row, currentPage, index);
        if (member) members.set(member.id, member);
    });

    if (!members.size) return;

    const controls = document.createElement('div');
    controls.id = `${MODULE_ID}-controls`;
    controls.classList.add('panel', 'panel-default');

    const panelBody = document.createElement('div');
    panelBody.classList.add('panel-body');
    controls.append(panelBody);

    const form = document.createElement('div');
    form.classList.add('form-inline');
    panelBody.append(form);

    const appendSpacer = () => form.append(document.createTextNode(' '));

    const createSelectGroup = (labelText: string) => {
        const group = document.createElement('div');
        group.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = `${labelText} `;

        const select = document.createElement('select');
        select.classList.add('form-control', 'input-sm');
        label.append(select);
        group.append(label);
        form.append(group);
        appendSpacer();

        return select;
    };

    const roleSelect = createSelectGroup($m('role').toString());
    const activitySelect = createSelectGroup($m('activity').toString());
    const sortSelect = createSelectGroup($m('sort').toString());

    activitySelect.append(
        createOption('', $m('allActivities').toString()),
        createOption('online', $m('online').toString()),
        createOption('offline', $m('offline').toString())
    );

    sortSelect.append(
        createOption('default', $m('sortOptions.default').toString()),
        createOption('name', $m('sortOptions.name').toString()),
        createOption('role', $m('sortOptions.role').toString()),
        createOption('activity', $m('sortOptions.activity').toString())
    );

    const directionButton = document.createElement('button');
    const directionTitle = $m('direction').toString();
    directionButton.type = 'button';
    directionButton.classList.add('btn', 'btn-default', 'btn-sm');
    directionButton.textContent = '↑';
    directionButton.title = directionTitle;
    directionButton.setAttribute('aria-label', directionTitle);
    directionButton.setAttribute('aria-pressed', 'false');
    form.append(directionButton);
    appendSpacer();

    const loadAllButton = document.createElement('button');
    loadAllButton.type = 'button';
    loadAllButton.classList.add('btn', 'btn-primary', 'btn-sm');
    loadAllButton.textContent =
        totalPages <= 1
            ? $m('allLoaded').toString()
            : $m('loadAll').toString();
    loadAllButton.disabled = totalPages <= 1;
    form.append(loadAllButton);
    appendSpacer();

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.classList.add('btn', 'btn-default', 'btn-sm');
    resetButton.textContent = $m('reset').toString();
    form.append(resetButton);

    const progress = document.createElement('p');
    progress.classList.add('help-block');
    progress.setAttribute('aria-live', 'polite');
    panelBody.append(progress);

    const summary = document.createElement('p');
    summary.classList.add('help-block');
    summary.setAttribute('aria-live', 'polite');
    panelBody.append(summary);

    table.before(controls);

    let descending = false;

    const refreshRoleOptions = () => {
        const selectedRole = roleSelect.value;
        const roles = Array.from(
            new Set(Array.from(members.values()).flatMap(member => member.roles))
        ).sort((a, b) => collator.compare(a, b));

        roleSelect.replaceChildren(
            createOption('', $m('allRoles').toString()),
            createOption(NO_ROLE, $m('noRole').toString()),
            ...roles.map(role => createOption(role, role))
        );

        if (
            Array.from(roleSelect.options).some(
                ({ value }) => value === selectedRole
            )
        )
            roleSelect.value = selectedRole;
    };

    const activityRank: Record<ActivityState, number> = {
        green: 0,
        gray: 1,
        blue: 2,
        yellow: 3,
        red: 4,
        unknown: 5,
    };

    const apply = () => {
        const selectedRole = roleSelect.value;
        const selectedActivity = activitySelect.value;
        const sort = sortSelect.value as SortType;
        const modifier = descending ? -1 : 1;
        const sortedMembers = Array.from(members.values()).sort((a, b) => {
            let comparison = 0;

            if (sort === 'name') comparison = collator.compare(a.name, b.name);
            else if (sort === 'role') {
                const aRoles = a.roles.join(', ');
                const bRoles = b.roles.join(', ');
                comparison = collator.compare(
                    aRoles || '\uffff',
                    bRoles || '\uffff'
                );
            } else if (sort === 'activity') {
                comparison = activityRank[a.activity] - activityRank[b.activity];
            } else comparison = a.order - b.order;

            if (!comparison) comparison = collator.compare(a.name, b.name);
            return comparison * modifier;
        });

        let visible = 0;
        sortedMembers.forEach(member => {
            const roleMatches =
                !selectedRole ||
                (selectedRole === NO_ROLE
                    ? !member.roles.length
                    : member.roles.includes(selectedRole));
            const activityMatches =
                !selectedActivity ||
                (selectedActivity === 'online'
                    ? member.activity === 'green'
                    : member.activity !== 'green' &&
                      member.activity !== 'unknown');

            member.row.hidden = !(roleMatches && activityMatches);
            if (!member.row.hidden) visible++;
            tbody.append(member.row);
        });

        summary.textContent = $m('summary', {
            loadedPages: loadedPages.size,
            total: members.size,
            totalPages,
            visible,
        }).toString();
    };

    const addPage = (doc: Document, page: number) => {
        const pageTable = findMemberTable(doc);
        const pageBody = pageTable && getMemberBody(pageTable);
        if (!pageBody) throw new Error(`Member table missing on page ${page}`);

        Array.from(pageBody.rows).forEach((row, index) => {
            const importedRow = document.importNode(row, true);
            const member = parseMember(importedRow, page, index);
            if (!member || members.has(member.id)) return;
            members.set(member.id, member);
            tbody.append(importedRow);
        });
        loadedPages.add(page);
        refreshRoleOptions();
        apply();
    };

    roleSelect.addEventListener('change', apply);
    activitySelect.addEventListener('change', apply);
    sortSelect.addEventListener('change', apply);
    directionButton.addEventListener('click', () => {
        descending = !descending;
        directionButton.textContent = descending ? '↓' : '↑';
        directionButton.setAttribute('aria-pressed', descending.toString());
        apply();
    });
    resetButton.addEventListener('click', () => {
        roleSelect.value = '';
        activitySelect.value = '';
        sortSelect.value = 'default';
        descending = false;
        directionButton.textContent = '↑';
        directionButton.setAttribute('aria-pressed', 'false');
        apply();
    });
    loadAllButton.addEventListener('click', async () => {
        loadAllButton.disabled = true;

        const pages = Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
        for (const page of pages) {
            if (loadedPages.has(page)) continue;

            progress.textContent = $m('loading', { page, totalPages }).toString();
            const pageUrl = new URL(currentUrl);
            pageUrl.searchParams.set('page', page.toString());

            try {
                const response = await LSSM.$stores.api.request(
                    pageUrl,
                    `${MODULE_ID}-page-${page}`
                );
                const { ok, status } = response;
                if (!ok) throw new Error(`HTTP ${status}`);

                const html = await response.text();
                addPage(
                    new DOMParser().parseFromString(html, 'text/html'),
                    page
                );
            } catch (error) {
                LSSM.$stores.console.error(
                    `Alliance member list: ${String(error)}`
                );
                progress.textContent = $m('loadError', { page }).toString();
                loadAllButton.disabled = false;
                return;
            }
        }

        progress.textContent = $m('allLoaded').toString();
        loadAllButton.textContent = $m('allLoaded').toString();
        if (pagination) pagination.hidden = true;
    });

    refreshRoleOptions();
    apply();
};
