import { RedesignParser } from 'typings/modules/Redesign';

export interface AvatarWindow {
    image: string;
    authenticity_token: string;
}

export default <RedesignParser<AvatarWindow>>(source => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    return {
        image:
            doc.querySelector<HTMLImageElement>(
                'img[src*="/hostedimages/avatars/images"]'
            )?.src ?? '',
        authenticity_token:
            (doc
                .querySelector<HTMLFormElement>('form[id^="edit_avatar_"]')
                ?.elements.namedItem('authenticity_token') as HTMLInputElement)
                ?.value ?? '',
    };
});
