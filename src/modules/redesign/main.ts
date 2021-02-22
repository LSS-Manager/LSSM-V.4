import { ModuleMainFunction } from 'typings/Module';

export default (LSSM => {
    LSSM.$store
        .dispatch('hook', {
            event: 'lightboxOpen',
            abortOnFalse: true,
            callback(href: string) {
                LSSM.$modal.show(
                    () =>
                        import(
                            /* webpackChunkName: "modules/redesign/lightbox" */ `./components/lightbox.vue`
                        ),
                    { url: href },
                    {
                        name: 'redesign-lightbox',
                        height: '96%',
                        width: '96%',
                    }
                );
                return false;
            },
        })
        .then();
}) as ModuleMainFunction;
