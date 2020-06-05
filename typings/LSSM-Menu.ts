export interface lssmMenuData {
    id: string;
    menuId: string;
    iconBg: string | null;
    labelInMenu: boolean;
    lssmLogo: URL;
    discord: string;
    wiki: string;
    version: string;
    mode: string;
}

export interface lssmMenuMethods {
    showAppstore(): void;
    showSettings(): void;
    showLibraries(): void;
    storeIconBg(): void;
}
