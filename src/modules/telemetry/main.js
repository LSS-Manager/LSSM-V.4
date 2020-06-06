const NOTE_STORAGE_KEY = 'telemetry_note_confirmed';
export default LSSM => {
    const $m = (key, args) => LSSM.$t(`modules.telemetry.${key}`, args);
    LSSM.$store
        .dispatch('storage/get', {
            key: NOTE_STORAGE_KEY,
            defaultValue: false,
        })
        .then(isConfirmed => {
            if (!isConfirmed) {
                LSSM.$modal.show('dialog', {
                    title: $m('info.title'),
                    text: $m('info.text', { wiki: LSSM.$store.getters.wiki }),
                    options: {},
                    buttons: [
                        {
                            title: $m('info.close'),
                            handler() {
                                LSSM.$store
                                    .dispatch('storage/set', {
                                        key: NOTE_STORAGE_KEY,
                                        value: true,
                                    })
                                    .then(() => LSSM.$modal.hide('dialog'));
                            },
                        },
                    ],
                });
            }
            console.log('send stats to server');
            // TODO: send stats to server
        });
};
//# sourceMappingURL=main.js.map
