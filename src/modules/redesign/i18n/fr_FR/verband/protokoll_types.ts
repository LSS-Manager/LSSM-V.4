export default {
    mission: { regex: /Mission majeur lancée/u },
    event: { regex: /Évènement d'alliance lancé/u },
    appl_accepted: { regex: /Ajouté à l'alliance/u },
    appl_declined: { regex: /Candidature rejetée/u },
    deny_appl: { regex: /Interdit de postuler à l'alliance/u },
    allow_appl: { regex: /Autorisé à postuler à l'alliance/u },
    left: { regex: /A quitté l'alliance/u },
    kicked: { regex: /A été explusé de l'alliance/u },
    set_chatban: { regex: /Bannisement de salon instauré/u },
    remove_chatban: { regex: /Bannisement de salon retiré/u },
    added_role: { regex: /Nommé .*?/u, title: 'Role Ajouté' },
    removed_role: { regex: /Destitué du rôle de .*?/u, title: 'Role Supprimé' },
    start_schooling: { regex: /Programme lancé/u },
    complete_schooling: { regex: /Programme complété/u },
    start_extension: { regex: /Extension lancée/u },
    complete_extension: { regex: /Extension achevée/u },
    build: { regex: /Bâtiment construit/u },
    demolish: { regex: /Bâtiment demoli/u }, //not sure to check
};
