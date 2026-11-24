export default (LSSM: Vue): void => {
    const redesignNoteId = LSSM.$stores.root.nodeAttribute(
        'redesign-note-message',
        true
    );
    const redesignNotePreviewId = LSSM.$stores.root.nodeAttribute(
        'redesign-note-message_preview',
        true
    );

    LSSM.$stores.root.addStyle({
        selectorText: [
            'textarea[name="note[message]"]',
            '#note-message',
            '#note_message',
            `#${redesignNoteId}`,
            `#${redesignNotePreviewId}`,
        ].join(','),
        style: {
            'font-family': 'monospace',
        },
    });
};
