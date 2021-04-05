import { RedesignParser } from 'typings/modules/Redesign';

export interface ProfileEditWindow {
    text: string;
    authenticity_token: string;
}

export default <RedesignParser<ProfileEditWindow>>(source => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const form = doc.querySelector<HTMLFormElement>(
        'form[id^="edit_profile_"]'
    );
    return {
        text:
            (form?.elements.namedItem(
                'profile[content]'
            ) as HTMLTextAreaElement)?.value ?? '',
        authenticity_token:
            (form?.elements.namedItem('authenticity_token') as HTMLInputElement)
                ?.value ?? '',
    };
});
