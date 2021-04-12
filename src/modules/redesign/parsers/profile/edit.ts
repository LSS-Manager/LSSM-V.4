import { RedesignParser } from 'typings/modules/Redesign';

export interface ProfileEditWindow {
    text: string;
}

export default <RedesignParser<ProfileEditWindow>>(({ doc }) => ({
    text:
        (doc
            .querySelector<HTMLFormElement>('form[id^="edit_profile_"]')
            ?.elements.namedItem('profile[content]') as HTMLTextAreaElement)
            ?.value ?? '',
}));
