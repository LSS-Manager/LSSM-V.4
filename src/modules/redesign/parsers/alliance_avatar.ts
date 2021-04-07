import { RedesignParser } from 'typings/modules/Redesign';

export interface AllianceAvatarWindow {
    image: string;
    authenticity_token: string;
}

export default <RedesignParser<AllianceAvatarWindow>>(source => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    return {
        image:
            doc.querySelector<HTMLImageElement>(
                'img[src*="/hostedimages/alliance_avatars/images"]'
            )?.src ?? '',
        authenticity_token:
            (doc
                .querySelector<HTMLFormElement>(
                    'form[id^="edit_alliance_avatar_"]'
                )
                ?.elements.namedItem('authenticity_token') as HTMLInputElement)
                ?.value ?? '',
    };
});
