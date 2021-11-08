import { RedesignParser } from 'typings/modules/Redesign';

export interface AllianceAvatarWindow {
    image: string;
}

export default <RedesignParser<AllianceAvatarWindow>>(({ doc }) => ({
    image:
        doc.querySelector<HTMLImageElement>(
            'img[src*="/hostedimages/alliance_avatars/images"]'
        )?.src ?? '',
}));
