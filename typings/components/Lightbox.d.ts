import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface LightboxData {
    fullscreen: boolean;
    fullscreenBefore: boolean;
    origWidth: number;
    origHeight: number;
    titleHidden: boolean;
    faTimes: IconDefinition;
    faExpand: IconDefinition;
    faCompress: IconDefinition;
    faChevronUp: IconDefinition;
}

export interface LightboxProps {
    name: string;
    noXBtn: boolean;
    noFullscreen: boolean;
    noTitleHide: boolean;
    fullHeight: boolean;
    extraClasses: Record<string, boolean>;
}

export interface LightboxMethods {
    expand(): void;
    compress(): void;
}
