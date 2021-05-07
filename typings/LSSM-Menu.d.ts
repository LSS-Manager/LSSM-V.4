export interface lssmMenuData {
    id: string;
    menuId: string;
    iconBg: string | null;
    iconBgAsNavBg: boolean;
    labelInMenu: boolean;
    lssmLogo: URL;
    discord: string;
    wiki: string;
    version: string;
    mode: string;
    navbg: {
        svg: SVGElement;
        hsl: [number, number, number];
        navbar: HTMLElement | null;
    };
}

export interface lssmMenuComputed {
    menuItems: HTMLAnchorElement[];
}

export interface lssmMenuMethods {
    showAppstore(): void;
    showSettings(): void;
    showLibraries(): void;
    storeIconBg(): void;
    setNavbarBG(color: string): void;
}
