export default {
    mission: { regex: /Mission majeur lancée/ },
    event: { regex: /Évènement d'alliance lancé/ },
    appl_accepted: { regex: /Ajouté à l'alliance/ },
    appl_declined: { regex: /Refusé à l'alliance/ },//à vérifié
    deny_appl: { regex: /Interdit de postuler à l'alliance/ },
    allow_appl: { regex: /Autorisé à postuler à l'alliance/ },
    left: { regex: /A quitté l'alliance/ },
    kicked: { regex: /A été explusé de l'alliance/ },
    set_chatban: { regex: /Bannisement de salon instauré/ },
    remove_chatban: { regex: /Bannisement de salon retiré/ },
    added_role: { regex: /Nommé .*?/, title: 'Role AJouté' },
    removed_role: { regex: /Destitué du rôle de .*?/, title: 'Role Supprimer' },
    start_schooling: { regex: /Programme lancé/ },
    complete_schooling: { regex: /Programme complété/ },
    start_extension: { regex: /Extension lancée/ },
    complete_extension: { regex: /Extension achevée/ },
    build: { regex: /Bâtiment construit/ },
    demolish: { regex: /Bâtiment demoli/ },//pas sur
};
