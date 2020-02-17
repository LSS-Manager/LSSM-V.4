module.exports = {
    name: 'Uhr',
    description:
        'Zeigt eine Konfigurierbare Uhr an verschiedenen Stellen nach Bedarf an.',
    settings: {
        displayNav: {
            title: 'Uhr in der Navigationsleiste anzeigen',
            description:
                'Als Position wird der linke Rand neben dem Logo gewählt.',
        },
        navFormat: {
            title: 'Format der Uhr in der Navigationsleiste',
            description: `Hier kannst du das Format der Uhr festlegen. Eine Hilfe hierzu findest du <a class="lightbox-open" href="{wiki}/modules/clock.html#konfiguration">hier</a>.`,
        },
    },
};
