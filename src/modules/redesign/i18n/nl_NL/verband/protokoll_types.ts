export default {
    mission: { regex: /Grote inzet aangemaakt/ },
    event: { regex: /Team-event gestart/ },
    appl_accepted: { regex: /Persoon aangenomen/ },
    appl_declined: { regex: /Persoon afgewezen voor het team/ },
    deny_appl: { regex: /Aanmelden bij het team verboden/ },
    allow_appl: { regex: /Aanmelden bij team toegestaan/ },
    left: { regex: /Team verlaten/ },
    kicked: { regex: /Uit het team verwijderd/ },
    set_chatban: { regex: /Chat-ban gegeven/ },
    remove_chatban: { regex: /Chat-ban verwijderd/ },
    added_role: { regex: /.*? gemaakt/, title: 'Rol toegewezen' },
    removed_role: { regex: /Als .*? verwijderd/, title: 'Rol verwijderd' },
    complete_schooling: { regex: /Opleiding afgerond/ },
    start_schooling: { regex: /Opleiding gestart/ },
    complete_extension: { regex: /Uitbreiding afgerond/ },
    start_extension: { regex: /Uitbreiding gestart/ },
    demolish: { regex: /Gebouw verwijderd/ },
    build: { regex: /Gebouw gebouwd/ },
};
