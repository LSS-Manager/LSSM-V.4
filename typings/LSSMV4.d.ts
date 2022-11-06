/**
 * @file - Type definitions for the LSSMV4 Vue component.
 */

import type { ClickHandler } from 'typings/store/notifications/Actions';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { NotificationsState } from './store/notifications/State';

export interface LSSMV4Data {
    faTimes: IconDefinition;
    id: string;
}

export interface LSSMV4Computed {
    notificationGroups: NotificationsState['groups'];
}

export interface LSSMV4Methods {
    getHandler: ClickHandler;
}
