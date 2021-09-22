import { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, ['credits', 'profile', 'tasks']>>{
    validatorFunction: () => true,
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
    profile: <Scope<Empty, [], ['open', 'level', 'awards']>>{
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
    },
    tasks: <Scope<Empty, [], ['open']>>{
        validatorFunction: () => true,
        open() {
            window.lightboxOpen('/tasks/index');
        },
    },
};
