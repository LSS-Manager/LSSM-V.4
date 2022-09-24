/**
 * @file - Type definitions for the LSSM-Menu Vue component.
 */

import type { useRootStore } from '@stores/index';
import type { useSettingsStore } from '@stores/settings';

export interface lssmMenuData {
    id: string;
    menuId: string;
    iconBg: string | null;
    iconBgAsNavBg: boolean;
    labelInMenu: boolean;
    lssmLogo: string;
    navbg: {
        svg: SVGElement;
        hsl: [number, number, number];
        navbar: HTMLElement | null;
        aborted: boolean;
    };
    versionWrapperId: string;
    settingsStore: ReturnType<typeof useSettingsStore>;
    rootStore: ReturnType<typeof useRootStore>;
    umzugDate: Date;
}

export interface lssmMenuComputed {
    menuItems: HTMLAnchorElement[];
    mode: 'beta' | 'stable';
    version: string;
    localUmzugTimeString: string;
}

export interface lssmMenuMethods {
    showAppstore(): void;
    showSettings(): void;
    showLibraries(): void;
    storeIconBg(): void;
    setNavbarBG(color: string): void;
    resetIconBg(): void;
}
