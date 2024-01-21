/**
 * @file - Type definitions for the LSSMV4 Vue component.
 */

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { ClickHandler, NotificationPosition } from '@stores/notifications';

export interface LSSMV4Data {
    faTimes: IconDefinition;
    id: string;
}

export interface LSSMV4Computed {
    notificationGroups: NotificationPosition[];
}

export interface LSSMV4Methods {
    getHandler: ClickHandler;
}
