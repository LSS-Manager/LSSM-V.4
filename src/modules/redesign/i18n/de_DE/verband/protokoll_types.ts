export default {
    mission: { regex: /Verbandgroßeinsatz gestartet/ },
    event: { regex: /Verbandsevent gestartet/ },
    appl_accepted: { regex: /In den Verband aufgenommen/ },
    appl_declined: { regex: /Bewerbung abgelehnt/ },
    deny_appl: { regex: /Bewerben beim Verband verboten/ },
    allow_appl: { regex: /Bewerben beim Verband erlaubt/ },
    left: { regex: /Verband verlassen/ },
    kicked: { regex: /Aus dem Verband geschmissen/ },
    set_chatban: { regex: /Chat-Ban gesetzt/ },
    remove_chatban: { regex: /Chat-Ban entfernt/ },
    added_role: { regex: /Als .*? gesetzt/, title: 'Rolle zugeteilt' },
    removed_role: { regex: /Als .*? entfernt/, title: 'Rolle entfernt' },
};
