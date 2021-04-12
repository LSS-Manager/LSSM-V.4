import { RedesignParser } from 'typings/modules/Redesign';

export interface AvatarWindow {
    image: string;
}

export default <RedesignParser<AvatarWindow>>(({ doc }) => ({
    image:
        doc.querySelector<HTMLImageElement>(
            'img[src*="/hostedimages/avatars/images"]'
        )?.src ?? '',
}));
