const modules = {
    appstore: {
        save: 'Sauvegarder',
        reset: 'Reset',
        noMapkit:
            'Ce module ne fonctionne pas avec "Mapkit" à cause des limitations de Mapkit !',
        dev: 'Ce module est encore en développement. Son activation peut causer des erreurs !',
        closeWarning: {
            title: 'Changements non sauvegardés',
            text: "Des changements ont été faits dans l'AppStore qui n'ont pas été sauvegardés. Sauvegardez ou faites un Reset pour fermer l'Appstore.",
            abort: 'Annuler',
            saveAndExit: 'Sauvegarder et quitter',
            exit: 'Quitter sans sauvegarder',
        },
    },
    settings: {
        name: 'Paramètres',
        save: 'Sauvegarder',
        discard: 'Annuler changements',
        reset: 'Reset',
        export: 'Exporter',
        import: 'Importer',
        appendableList: {
            unique: {
                title: 'Valeur en double',
                text: 'Il ne doit pas y avoir de valeurs en double dans la colonne **{title}**. La valeur **{valeur}** existe déjà !',
                confirm: 'OK',
            },
        },
        resetWarning: {
            title: 'Reset des paramètres',
            text: 'Voulez-vous remettre les paramètres par défaut ? Cela ne peut pas être annulé !',
            close: 'Annuler',
            total: 'Tous les paramètres',
            module: 'Seulement pour ce module',
        },
        resetWarningSetting: {
            title: 'Réinitialisation des paramètres',
            text: 'Voulez-vous vraiment remettre ce paramètre <b>{setting}</b> du module <b>{module}</b> à sa valeur par défaut ?',
            close: 'Annuler',
            reset: 'Réinitialiser',
        },
        closeWarning: {
            title: 'Changements non sauvegardés',
            text: "Des changements ont été faits dans les paramètres qui n'ont pas été sauvegardés. Faites un Reset, une annulation ou une sauvegarde pour fermer les paramètres.",
            abort: 'Annuler',
            saveAndExit: 'Sauvegarder et quitter',
            exit: 'Quitter sans sauvegarder',
        },
        changeList: {
            true: 'On',
            false: 'Off',
        },
        locationSelect: {
            location: 'Sélectionnez une position',
            zoom: 'Sélectionner la position et le zoom',
            sync: 'Utiliser la position actuelle',
        },
    },
} as Record<string, Record<string, unknown>>;

export default {
    modules,
    updateUserscript: {
        title: 'Script utilisateur obsolète',
        text: `Cher utilisateur de LSSM,<br>
malheureusement votre userscript LSSM V.4 est périmé. Dans la dernière version, des modifications ont été apportées au userscript, qui sont importantes pour le fonctionnement de la V.4 de LSSM.<br>
Vous avez besoin d'au moins la version {minVersion}, la mise à jour peut être effectuée confortablement en cliquant sur {updateLink}.<br>
Il peut arriver que la mise à jour ne fonctionne pas en cliquant sur le lien (pour des raisons inconnues). Vous pouvez alors soit déclencher une mise à jour dans Tampermonkey (cliquez sur l'icône de Tampermonkey dans votre navigateur, puis sur "Aperçu". Cochez la case en face du userscript LSSM et sélectionnez "Update" comme action. <br>
Si cela ne fonctionne pas non plus, modifiez le script LSSM dans Tampermonkey en remplaçant tout le contenu du script par le contenu de {bypassLink}.<br>
Parfois, LSSM est installé plusieurs fois après une mise à jour. Dans ce cas, veuillez supprimer le script qui n'a pas la version 4.5.10 (dans Tampermonkey).<br>
Nous sommes désolés pour tout problème causé si les mises à jour n'ont pas fonctionné correctement.
<br>
Bien à vous,<br>
votre équipe LSSM`,
        close: 'Ok',
    },
    error: {
        title: 'LSS Manager: Erreur',
        msg: "Si cette erreur arrive fréquemment, merci de le signaler à l'équipe LSSM !",
        requestIssue: {
            title: 'requête erronée: Status {status}',
            text: `Aïe, malheureusement une erreur s'est produite avec cette requête du serveur :<br>
<b>Status</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>URL</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Fonctionnalité</b>: <code>{feature}</code><br>
<b>Durée</b>: <code>{duration}ms</code><br>
<b>Utilisateur</b>: <code>{uid}</code><br>
<b>Timestamp</b>: <code>{timestamp}</code>
<br>
Veuillez réessayer d'effectuer l'action souhaitée.<br>
Si plusieurs demandes échouent dans un court laps de temps, cela peut être dû à des problèmes de serveur. Veuillez réessayer ultérieurement.`,
            close: 'Fermer la remarque',
        },
    },
    warnings: {
        version: {
            title: 'Mauvaise version de LSS Manager',
            text: "Cher utilisateur, malheureusement vous n'avez pas la dernière version de LSS Manager. La dernière version est {version} et vous avez la {current}. Merci de recharger le jeu en vidant le cache (Ctrl + F5 ou command + R sur Apple), cela devrait régler le problème. Si le problème persiste, merci de le signaler à l'équipe ! Si vous vous utilisez une mauvaise version nous ne pouvons garantir le plein fonctionnement de LSS-Manager.",
            close: 'Fermer ce message et recharger le jeu (recommandé)',
            abort: 'Fermer ce message sans recharger le jeu',
        },
    },
    anniversary1: {
        closeNote:
            'Astuce : Vous pouvez également cliquer sur les ballons pour les fermer !',
        title: '🎉 Il y a des raisons de faire la fête ! 🎉',
        content:
            'Wow, comme le temps passe vite !<br>Cela fait<b>Deux ans</b>que la V.4 de LSS Manager est en ligne ! Il s\'est passé beaucoup de choses cette année, bien sûr, et en cette occasion spéciale, nous aimerions vous remercier tout particulièrement, vous, les utilisateurs. La joie avec laquelle vous testez nos nouvelles fonctionnalités nous inspire encore et encore et nous donne une nouvelle motivation pour continuer. Un grand merci également à nos traducteurs qui donnent de leur temps pour rendre le LSSM utilisable dans d\'autres versions du jeu.</br>Pour fêter cela, nous aimerions partager ici quelques faits et chiffres :<ul><li><code>10 février 2020</code>: Le premier commit sur GitHub a été effectué: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Depuis lors, nous avons effectué plus de 11 113 commits !</li><li><code>19 septembre 2020</code>: La V.4 a été officiellement annoncée pour la première fois sur le forum: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. La phase d\'inscription des bêta-testeurs a également commencé.</li><li><code>17 octobre 2020</code>: Les bêta-testeurs ont eu accès à la V.4 pour la première fois. La phase bêta de 4 semaines a donc commencé</li><li><code>21 novembre 2020</code>: LSS Manager V.4 est en ligne pour tout le monde !</li><li>Notre télémétrie enregistre actuellement environ 5 000 utilisateurs au cours des 6 derniers mois. Parmi ceux-ci, plus de 2 200 étaient actifs au cours des 14 derniers jours. Le chiffre noir (nombre d\'utilisateurs qui ont désactivé la télémétrie) ne peut être estimé.</li><li>Notre fil de discussion sur le forum a maintenant atteint presque 1 200 messages. C\'est beaucoup, mais le fil de discussion de la V.3, qui frôle actuellement les 3 500 réponses, est loin de nous rattraper.</li><li>Pour plus de statistiques, consultez notre discussion sur le forum:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li></ul><br>Nous attendons avec impatience de nombreux autres grands moments pendant la durée de vie de LSSM V.4 !<br>L\'équipe de LSSM<br>Jan, Sanni & Ron',    },
    globalSettings: {
        name: 'Paramètres généraux',
        labelInMenu: {
            title: "Titre au lieu d'une icone dans le menu",
            description:
                'Un simple titre dans la barre de navigation au lieu du logo LSSM',
        },
        allowTelemetry: {
            description:
                'Contrôle si LSS-Manager est autorisé à envoyer des données, ce qui nous aide à développer cette extension.',
            title: 'Autoriser la télémétrie',
        },
        branch: {
            description:
                'Choisissez ici entre la version stable, la version bêta ou une version preview. Notez que les versions preview sont automatiquement supprimées environ 7 jours après leur dernière mise à jour.',
            title: 'Choisir sa version',
        },
        iconBg: {
            description: "Changez la couleur de fond de l'icône LSSM !",
            title: "Couleur de fond de l'icône LSSM",
        },
        iconBgAsNavBg: {
            description:
                "Colorez toute la barre de navigation avec la couleur de fond de l'icône du LSSM!",
            title: 'Colorier la barre de navigation',
        },
        loadingIndicator: {
            description:
                'Si ce paramètre est actif, LSSM affiche un petit cercle de chargement dans le coin inférieur droit.',
            title: 'Afficher la progression du chargement',
        },
        osmDarkTooltip: {
            description:
                'Ce paramètre assombrit les infobulles sur la carte si vous avez activé le mode sombre.',
            title: 'Infobulles foncées sur la carte',
        },
        osmDarkControls: {
            description:
                'Ce paramètre assombrit les boutons sur la carte si vous avez activé le mode sombre.',
            title: 'Boutons sombres sur la carte',
        },
        v3MenuAsSubmenu: {
            title: 'Menu V3 comme sous-menu',
            description:
                "Déplace le menu du LSSM V3 vers le menu du V4 pour gagner de l'espace dans la barre de navigation.",
        },
        debugMode: {
            title: 'Debug-Mode',
            description:
                "Un petit mode de débogage qui affiche des conseils utiles dans la console du navigateur. Son activation n'est recommandée que si elle est demandée par l'équipe LSSM, car la console contiendra de nombreux messages.",
        },
    },
    vehicles: {
        0: {
            caption: 'FPT',
            color: '#cc0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 4,
            maxPersonnel: 6,
            wtank: 3000,
            possibleBuildings: [0, 18],
        },
        1: {
            caption: 'FPTL',
            color: '#bb0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 4,
            maxPersonnel: 6,
            wtank: 2000,
            possibleBuildings: [0, 18],
        },
        2: {
            caption: 'EPA',
            color: '#d92626',
            coins: 30,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 3 bases de pompiers',
        },
        3: {
            caption: 'VLCG',
            color: '#d02525',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
        },
        4: {
            caption: 'VSR',
            color: '#ad1f1f',
            coins: 25,
            credits: 12_180,
            minPersonnel: 2,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 4 bases de pompiers',
        },
        5: {
            caption: 'ASSU',
            color: '#9c691c',
            coins: 25,
            credits: 5000,
            minPersonnel: 3,
            maxPersonnel: 3,
            possibleBuildings: [2, 20],
        },
        6: {
            caption: 'CCGC',
            color: '#aa0000',
            coins: 25,
            credits: 17_300,
            minPersonnel: 1,
            maxPersonnel: 2,
            wtank: 11_000,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 7 bases de pompiers',
        },
        7: {
            caption: 'VIRT',
            color: '#770000',
            coins: 25,
            credits: 19_200,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [0, 18],
            schooling: {
                'Centre de secours': {
                    ['Véhicules risques chimiques']: {
                        all: true,
                    },
                },
            },
            special:
                'Nécessaire dès lors que vous avez construit 11 bases de pompiers',
        },
        8: {
            caption: 'Véhicule de patrouille',
            color: '#3a8b18',
            coins: 25,
            credits: 5000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [6, 19],
        },
        9: {
            caption: 'HéliSMUR',
            color: '#e68a19',
            coins: 30,
            credits: 300_000,
            minPersonnel: 3,
            maxPersonnel: 5,
            possibleBuildings: [5],
            schooling: {
                Secours: {
                    ['Médecin']: {
                        all: true,
                    },
                },
            },
        },
        10: {
            caption: 'VAR',
            color: '#d90e0e',
            coins: 25,
            credits: 11_680,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 5 bases de pompiers',
        },
        11: {
            caption: 'VPC',
            color: '#791515',
            coins: 25,
            credits: 25_500,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 18],
            schooling: {
                'Centre de secours': {
                    'Commandement mobile': {
                        all: true,
                    },
                },
            },
            special:
                'Nécessaire dès lors que vous avez construit 13 bases de pompiers',
        },
        12: {
            caption: 'FPTSR',
            color: '#b80000',
            coins: 25,
            credits: 19_000,
            minPersonnel: 2,
            maxPersonnel: 6,
            wtank: 3000,
            possibleBuildings: [0, 18],
            special: 'Vous devez posséder au moins le grade : Sergent-chef.',
        },
        13: {
            caption: 'VTU',
            color: '#d71919',
            coins: 25,
            credits: 12_180,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 4 bases de pompiers',
        },
        14: {
            caption: 'VGRIMP',
            color: '#ca3516',
            coins: 25,
            credits: 19_000,
            minPersonnel: 2,
            maxPersonnel: 5,
            possibleBuildings: [0, 18],
            schooling: {
                'Centre de secours': {
                    ['IMP (Intervention en Milieu Périlleux)']: {
                        all: true,
                    },
                },
            },
            special:
                'Nécessaire dès lors que vous avez construit 12 bases de pompiers',
        },
        15: {
            caption: 'BEA',
            color: '#dc1818',
            coins: 25,
            credits: 19_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
        },
        16: {
            caption: 'VPL',
            color: '#2285bb',
            coins: 25,
            credits: 10_000,
            minPersonnel: 3,
            maxPersonnel: 3,
            possibleBuildings: [0],
            schooling: {
                'Centre de secours': {
                    'PLG (Plongeur)': {
                        all: true,
                    },
                },
            },
            special: 'Nécessite une formation spéciale (PLG (Plongeur))',
        },
        17: {
            caption: 'BLS',
            color: '#225f77',
            coins: 12,
            credits: 6000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0],
            special: 'Remorqueuse nécessaire (VPL, VTU)',
        },
        18: {
            caption: 'Choucas',
            color: '#36a21e',
            coins: 30,
            credits: 300_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [13],
            schooling: {
                'Poste de police': {
                    'Licence de Pilote': {
                        all: true,
                    },
                },
            },
        },
        19: {
            caption: 'Equipe cynophile',
            color: '#27aa22',
            coins: 25,
            credits: 7000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19],
            schooling: {
                'Poste de police': {
                    ['Maître chien']: {
                        all: true,
                    },
                },
            },
            special:
                'Nécessaire dès lors que vous avez construit 6 postes de police.',
        },
        20: {
            caption: 'Unité motocycliste',
            color: '#22aa30',
            coins: 18,
            credits: 2500,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [6, 19],
            schooling: {
                'Poste de police': {
                    'Formation Motocycliste': {
                        all: true,
                    },
                },
            },
        },
        21: {
            caption: 'CCFS',
            color: '#d71919',
            coins: 25,
            credits: 19_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            wtank: 14_500,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
        },
        22: {
            caption: 'CCFM',
            color: '#d71919',
            coins: 8,
            credits: 8000,
            minPersonnel: 2,
            maxPersonnel: 4,
            wtank: 4000,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
        },
        23: {
            caption: 'CCFL',
            color: '#d71919',
            coins: 5,
            credits: 5000,
            minPersonnel: 2,
            maxPersonnel: 4,
            wtank: 2000,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
        },
        24: {
            caption: 'VLHR',
            color: '#d71919',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [0, 18],
            special:
                'Nécessaire dès lors que vous avez construit 6 bases de pompiers',
        },
        25: {
            caption: 'VSAV',
            color: '#9c691c',
            coins: 25,
            credits: 5000,
            minPersonnel: 3,
            maxPersonnel: 3,
            possibleBuildings: [0],
        },
        26: {
            caption: 'VL SSSM',
            color: '#9c691c',
            coins: 20,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0],
            schooling: {
                'Centre de secours': {
                    ['Médecin']: {
                        all: true,
                    },
                },
            },
        },
        27: {
            caption: 'VLM',
            color: '#9c691c',
            coins: 20,
            credits: 4000,
            minPersonnel: 3,
            maxPersonnel: 3,
            possibleBuildings: [2, 20],
            schooling: {
                Secours: {
                    ['Médecin']: {
                        all: true,
                    },
                },
            },
        },
        28: {
            caption: 'AR',
            color: '#9c691c',
            coins: 30,
            credits: 10_000,
            minPersonnel: 3,
            maxPersonnel: 3,
            possibleBuildings: [2, 20],
            schooling: {
                Secours: {
                    ['Médecin']: {
                        all: true,
                    },
                },
            },
        },
        29: {
            caption: 'PC DSM',
            color: '#9c691c',
            coins: 25,
            credits: 20_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            possibleBuildings: [2, 20],
            schooling: {
                Secours: {
                    DSM: {
                        all: true,
                    },
                },
            },
            special:
                'Nécessaire dès lors que vous avez construit 6 postes de secours',
        },
        30: {
            caption: 'Ambulance Type A',
            color: '#9c691c',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [2, 20],
        },
        31: {
            caption: 'VTP',
            color: '#d71919',
            coins: 10,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 9,
            possibleBuildings: [0, 18],
        },
        32: {
            caption: 'CCRL',
            color: '#d71919',
            coins: 10,
            credits: 15_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            wtank: 1400,
            possibleBuildings: [0, 18],
            special: 'Vous devez posséder au moins le grade : Adjudant.',
        },
        33: {
            caption: 'CCRM',
            color: '#d71919',
            coins: 10,
            credits: 18_000,
            minPersonnel: 2,
            maxPersonnel: 6,
            wtank: 2500,
            possibleBuildings: [0, 18],
            special: 'Vous devez posséder au moins le grade : Adjudant.',
        },
        34: {
            caption: 'CCRSR',
            color: '#d71919',
            coins: 15,
            credits: 30_000,
            minPersonnel: 2,
            maxPersonnel: 6,
            wtank: 2000,
            possibleBuildings: [0, 18],
            special: 'Vous devez posséder au moins le grade : Adjudant.',
        },
        35: {
            caption: 'FMOGP',
            color: '#d71919',
            coins: 15,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            wtank: 12_000,
            possibleBuildings: [0],
        },
        36: {
            caption: 'CDHR',
            color: '#d71919',
            coins: 10,
            credits: 15_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            possibleBuildings: [0],
        },
        37: {
            caption: 'FDGP',
            color: '#d71919',
            coins: 15,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [0],
        },
        38: {
            caption: 'MPR',
            color: '#d71919',
            coins: 10,
            credits: 10_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0],
            special:
                'Remorqueuse nécessaire (FPT, FPTL, CCFS, CCFM, CCFL, CCRL, CCRM, CCGC, FMOGP, VLHR, CDHR, FDGP)',
        },
        39: {
            caption: 'VR',
            color: '#225CB5',
            coins: 5,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [11],
        },
        40: {
            caption: 'VCT',
            color: '#225CB5',
            coins: 10,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [11],
            schooling: {
                'Poste de police': {
                    ['Commandement Mobile']: {
                        all: true,
                    },
                },
            },
        },
        41: {
            caption: 'RAM',
            color: '#225CB5',
            coins: 10,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            schooling: {
                'Poste de police': {
                    ['Armurier']: {
                        all: true,
                    },
                },
            },
        },
        42: {
            caption: 'VTP',
            color: '#225CB5',
            coins: 10,
            credits: 15_000,
            minPersonnel: 2,
            maxPersonnel: 2,
            possibleBuildings: [11],
        },
        43: {
            caption: 'ELE',
            color: '#225CB5',
            coins: 10,
            credits: 35_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [11],
            schooling: {
                'Poste de police': {
                    ["Lanceur d'eau"]: {
                        all: true,
                    },
                },
            },
        },
        44: {
            caption: 'ReBP',
            color: '#225CB5',
            coins: 10,
            credits: 10_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [11],
            special: 'Remorqueuse nécessaire (VR)',
        },
        45: {
            caption: 'VAT',
            color: '#225CB5',
            coins: 10,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [11],
        },
        46: {
            caption: 'Buggy',
            color: '#225CB5',
            coins: 15,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [11, 23],
        },
        47: {
            caption: 'CSL',
            color: '#225CB5',
            coins: 12,
            credits: 6000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [11, 23],
            special: 'Remorqueuse nécessaire (Buggy)',
        },
        48: {
            caption: 'CTT',
            color: '#225CB5',
            coins: 10,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [23],
            schooling: {
                "Centre de Formation et d'Intervention": {
                    ['Certificat de surveillance et sauvetage aquatique']: {
                        all: true,
                    },
                },
            },
        },
        49: {
            'caption': 'VCSM',
            'color': '#225CB5',
            'coins': 25,
            'credits': 75_000,
            'minPersonnel': 2,
            'maxPersonnel': 6,
            'possibleBuildings': [24],
            "Centre de Formation et d'Intervention": {
                ['Accréditation nautique']: {
                    all: true,
                },
            },
        },
        50: {
            'caption': 'Dragon',
            'color': '#225CB5',
            'coins': 30,
            'credits': 300_000,
            'minPersonnel': 2,
            'maxPersonnel': 5,
            'possibleBuildings': [26],
            "Centre de Formation et d'Intervention": {
                ["Pilote d'hélicoptère"]: {
                    all: true,
                },
            },
        },
    },
    buildingCategories: {
        Pompiers: {
            buildings: [0, 1, 18],
            color: '#ff2d2d',
        },
        Ambulances: {
            buildings: [2, 3, 4, 5, 20],
            color: '#ffa500',
        },
        Police: {
            buildings: [6, 8, 11, 13, 19],
            color: '#00ac00',
        },
        Autre: {
            buildings: [7, 14, 21, 22],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        Incendie: {
            vehicles: {
                ["Fourgons d'incendie"]: [0, 1, 12, 13],
                ['Échelles']: [2, 15],
                ['Véhicules spéciaux']: [4, 6, 7, 10, 14, 31, 36, 37, 38],
                'Chefs de groupe': [3, 11],
                'Ambulances': [25, 26],
                'Nautique': [16, 17],
                ['Feux de Forêt']: [21, 22, 23, 24, 32, 33, 34, 35],
            },
            color: '#ff2d2d',
        },
        Ambulances: {
            vehicles: {
                Ambulances: [5, 27, 28, 29, 30],
                Dragon: [9],
            },
            color: '#ffa500',
        },
        Police: {
            vehicles: {
                ['Véhicules de patrouille']: [8],
                ['Unités motocyclistes']: [20],
                Choucas: [18],
                ['Équipes cynophiles']: [19],
                ["Maintien de l'Ordre"]: [39, 40, 41, 42, 43, 44, 45],
            },
            color: '#00ac00',
        },
        Maritime: {
            vehicles: {
                ['Sauvetage Côtier']: [46, 47, 48, 49, 50],
            },
            color: '#00ac00',
        },
    },
    small_buildings: {
        0: 18,
        2: 20,
        6: 19,
    },
    schoolings: {
        'Centre de secours': [
            {
                caption: 'Véhicules risques chimiques',
                duration: '3 jours',
                staffList: 'Véhicules risques chimiques',
            },
            {
                caption: 'Commandement mobile',
                duration: '5 jours',
                staffList: 'VPC',
            },
            {
                caption: 'Formation SSLIA',
                duration: '3 jours',
            },
            {
                caption: 'SAV (Sauvetage Aquatique)',
                duration: '3 jours',
            },
            {
                caption: 'Navigation maritime',
                duration: '5 jours',
            },
            {
                caption: 'IMP (Intervention en Milieu Périlleux)',
                duration: '4 jours',
                staffList: 'Spécialiste IMP',
            },
            {
                caption: 'PLG (Plongeur)',
                duration: '5 jours',
                staffList: 'PLG (Plongeur)',
            },
            {
                caption: 'Médecin',
                duration: '5 jours',
                staffList: 'Médecin urgentiste',
            },
        ],
        'Secours': [
            {
                caption: 'DSM',
                duration: '7 jours',
                staffList: 'Chef du pôle urgences',
            },
            {
                caption: 'Médecin',
                duration: '5 jours',
                staffList: 'Médecin urgentiste',
            },
        ],
        'Poste de police': [
            {
                caption: 'Licence de Pilote',
                duration: '7 jours',
                staffList: 'Aviation policière',
            },
            {
                caption: 'Maître chien',
                duration: '5 jours',
                staffList: 'Brigade canine',
            },
            {
                caption: 'Formation Motocycliste',
                duration: '3 jours',
                staffList: 'Policier motocycliste',
            },
            {
                caption: 'Commandement Mobile',
                duration: '7 jours',
                staffList: 'Commandement Mobile',
            },
            {
                caption: "Lanceur d'eau",
                duration: '7 jours',
                staffList: 'Opérateur ELE',
            },
            {
                caption: 'Armurier',
                duration: '7 jours',
                staffList: 'Armurier',
            },
        ],
        "Centre de Formation et d'Intervention": [
            {
                caption: "Pilote d'hélicoptère",
                duration: '5 jours',
                staffList: "Pilote d'hélicoptère",
            },
            {
                caption: 'BNSSA',
                duration: '5 jours',
                staffList: 'BNSSA',
            },
            {
                caption: 'Accréditation nautique',
                duration: '3 jours',
                staffList: 'Accréditation nautique',
            },
            {
                caption: 'Certificat de surveillance et sauvetage aquatique',
                duration: '5 jours',
                staffList: 'Certificat de surveillance et sauvetage aquatique',
            },
        ],
    },
    amount: 'Quantité',
    search: 'Rechercher',
    alliance: 'Alliance',
    premiumNotice: 'Compte premium de Opérateur112 nécessaire.',
    credits: 'Crédits',
    coins: 'Pièces',
    close: 'Fermer',
    fullscreen: {
        expand: 'Active le mode plein écran',
        compress: 'désactive le mode plein écran',
    },
    hideTitle: 'Montrer titre | Cacher titre',
    vehicle: 'Véhicules | Véhicule | Véhicules',
    building: 'Bâtiments',
    station: 'Casernes | Caserne | Casernes',
    distance: 'Distance | Distances',
    vehicleType: 'Type de véhicule',
    noOptions: 'Sorry, no matching options.',
    fmsReal2Show: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        9: 9,
    },
    pois: [
        'Parc',
        'Lac',
        'Hôpital',
        'Forêt',
        'Arrêt de bus',
        'Arrêt de tram',
        'Gare ferroviaire (trajets régionaux)',
        'Gare ferroviaire (trajets régionaux et grandes lignes)',
        'Gare de marchandises',
        'Supermarché (petit)',
        'Supermarché (grand)',
        'Station-service',
        'École',
        'Musée',
        'Centre commercial',
        'Garage automobile',
        'Sortie d’autoroute',
        'Marché de Noël',
        'Hangar',
        'Discothèque',
        'Stade',
        'Ferme',
        'Bureaux',
        'Piscine',
        'Passage à niveau',
        'Théâtre',
        'Fête foraine',
        'Rivière',
        'Petit aéroport (piste)',
        'Grand aéroport (piste)',
        'Terminal d’aéroport',
        'Banque',
        'Entrepôt',
        'Pont',
        'Restauration rapide',
        'Port de fret',
        'Centre de recyclage',
        'Gratte-ciel',
        'Quai de navire de croisière',
        'Marina',
        'Passage à niveau piéton',
        'Tunnel',
        'Entrepôt frigorifique',
        'Centrale électrique',
        'Usine',
        'Casse',
        'Station de métro',
        'Petite citerne de produits chimiques',
        'Grande citerne de produits chimiques',
        'Hôtel',
        'Bar',
        'Décharge',
        'Parking couvert',
        'Silo',
        'Eolienne',
        'Voie navigable',
        'Camping',
        'Atelier de menuiserie',
        'Centre-ville',
        'Colline',
        'Quai',
        'Terrain de jeux',
        'Circuit de cross',
        'Résidence Protégée',
        'Falaise',
        'Raffinerie de pétrole',
        'Lieu de culte',
        'Plage',
    ],
    only_alliance_missions: [57, 74],
    transfer_missions: [325, 326],
    ranks: {
        missionchief: {
            0: 'Auxiliaire',
            200: 'Sapeur',
            10_000: 'Caporal',
            100_000: 'Caporal-chef',
            1_000_000: 'Sergent',
            5_000_000: 'Sergent-chef',
            20_000_000: 'Adjudant',
            50_000_000: 'Adjudant-chef',
            1_000_000_000: 'Lieutenant',
            2_000_000_000: 'Capitaine',
            5_000_000_000: 'Commandant',
        },
        policechief: {
            0: 'Adjoint/e de sécurité',
            200: 'Gardien/ne de la paix',
            10_000: 'Brigadier/ère de police',
            100_000: 'Brigadier/ère chef de police',
            1_000_000: 'Major de police',
            5_000_000: 'Lieutenant de police',
            20_000_000: 'Capitaine de police',
            50_000_000: 'Commandant de police',
            1_000_000_000: 'Commissaire de police',
            2_000_000_000: 'Commissaire divisionnaire de police',
            5_000_000_000: 'Directeur/trice général/e de la police',
        },
    },
};
