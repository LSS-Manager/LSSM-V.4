import { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['alliance', 'credits', 'profile', 'tasks']>>{
    validatorFunction: () => true,
    alliance: <
        Scope<
            Empty,
            [],
            [
                'open',
                'members',
                'buildings',
                'funds',
                'forum',
                'schoolings',
                'messages'
            ]
        >
    >{
        validatorFunction: () => true,
        open() {
            window.lightboxOpen('/verband');
        },
        buildings() {
            window.lightboxOpen('/verband/gebauede');
        },
        forum() {
            window.lightboxOpen('/alliance_threads');
        },
        funds() {
            window.lightboxOpen('/verband/kasse');
        },
        members() {
            window.lightboxOpen('/verband/mitglieder');
        },
        messages() {
            window.lightboxOpen('/alliance_messages');
        },
        schoolings() {
            window.lightboxOpen('/schoolings');
        },
    },
    credits: <Scope<Empty, [], ['open', 'daily', 'overview']>>{
        validatorFunction: () => true,
        daily() {
            window.lightboxOpen('/credits/daily');
        },
        open() {
            window.lightboxOpen('/credits');
        },
        overview() {
            window.lightboxOpen('/credits/overview');
        },
    },
    profile: <Scope<Empty, [], ['open', 'level', 'awards', 'notes']>>{
        validatorFunction: () => true,
        open() {
            window.lightboxOpen(`/profile/${window.user_id}`);
        },
        level() {
            window.lightboxOpen('/level');
        },
        awards() {
            window.lightboxOpen('/auszeichnungen');
        },
        notes() {
            window.lightboxOpen('/note');
        },
    },
    tasks: <Scope<Empty, [], ['open']>>{
        validatorFunction: () => true,
        open() {
            window.lightboxOpen('/tasks/index');
        },
    },
};
