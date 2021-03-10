interface Entry {
    total: number;
    average: number;
    amount: number;
    desc: string;
}

interface Link {
    href: string;
    text: string;
}

export interface CreditsDailyWindow {
    entries: Entry[];
    nav: {
        title: string;
        links: Link[];
    };
}

export default (source: string): CreditsDailyWindow => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const nav = doc.querySelector<HTMLDivElement>(
        'nav.navbar.navbar-default .container-fluid'
    );
    const getNum = (el: Element | null) =>
        parseInt(
            el?.textContent
                ?.trim()
                .match(/-?\d{1,3}([.,]\d{3})*/)?.[0]
                ?.replace(/[.,]/g, '') ?? '0'
        );
    return {
        entries: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>('#daily_table tbody tr')
        ).map(entry => ({
            total: getNum(entry.children[0]),
            average: getNum(entry.children[1]),
            amount: getNum(entry.children[2]),
            desc: entry.children[3]?.textContent?.trim() ?? '',
        })),
        nav: {
            title:
                nav?.querySelector<HTMLAnchorElement>(
                    '.navbar-header a.navbar-brand'
                )?.textContent ?? '',
            links: nav
                ? Array.from(
                      nav.querySelectorAll<HTMLAnchorElement>(
                          'ul.nav.navbar-nav.navbar-right li a'
                      )
                  )
                      .map(link => ({
                          href: new URL(link.href).pathname,
                          text: link.textContent?.trim() ?? '',
                      }))
                      .filter(({ href }) => href !== window.location.pathname)
                : [],
        },
    };
};
