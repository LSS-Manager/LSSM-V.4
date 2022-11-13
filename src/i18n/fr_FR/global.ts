export default {
    updateUserscript: {
        title: 'Script utilisateur obsolète',
        text: `Cher utilisateur de la LSSM,<br>
Malheureusement, votre userscript LSSM V.4 est obsolète. Dans la toute dernière version, des modifications ont été apportées au userscript, qui sont importantes pour le fonctionnement de LSSM V.4.<br>
Vous avez besoin d'au moins la version {minVersion}, la mise à jour peut être faite facilement en cliquant sur {updateLink}.<br>
Parfois, la mise à jour ne fonctionne pas en cliquant sur le lien (pour des raisons inconnues). Dans ce cas, vous pouvez soit déclencher une mise à jour dans Tampermonkey (cliquez sur l'icône de Tampermonkey dans votre navigateur, puis sur "Aperçu". Cochez la case devant le userscript LSSM et sélectionnez "Update" comme action.<br>
Si cela ne fonctionne pas non plus, modifiez le script LSSM dans Tampermonkey en remplaçant tout le contenu du script par le contenu de {bypassLink}..<br>
Si cela ne fonctionne pas non plus, modifiez le script LSSM dans Parfois, LSSM est installé plusieurs fois après une mise à jour. Dans ce cas, il est utile de désinstaller/supprimer toutes les installations de LSSM V.4 dans Tampermonkey, puis de réinstaller LSSM V.4 une fois.<br><br>
Sincères salutations,<br>
l'équipe LSSM`,
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
            'Wow, comme le temps passe vite !<br>Cela fait<b>Deux ans</b>que la V.4 de LSS Manager est en ligne ! Il s\'est passé beaucoup de choses cette année, bien sûr, et en cette occasion spéciale, nous aimerions vous remercier tout particulièrement, vous, les utilisateurs. La joie avec laquelle vous testez nos nouvelles fonctionnalités nous inspire encore et encore et nous donne une nouvelle motivation pour continuer. Un grand merci également à nos traducteurs qui donnent de leur temps pour rendre le LSSM utilisable dans d\'autres versions du jeu.</br>Pour fêter cela, nous aimerions partager ici quelques faits et chiffres :<ul><li><code>10 février 2020</code>: Le premier commit sur GitHub a été effectué: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Depuis lors, nous avons effectué plus de 11 113 commits !</li><li><code>19 septembre 2020</code>: La V.4 a été officiellement annoncée pour la première fois sur le forum: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. La phase d\'inscription des bêta-testeurs a également commencé.</li><li><code>17 octobre 2020</code>: Les bêta-testeurs ont eu accès à la V.4 pour la première fois. La phase bêta de 4 semaines a donc commencé</li><li><code>21 novembre 2020</code>: LSS Manager V.4 est en ligne pour tout le monde !</li><li>Notre télémétrie enregistre actuellement environ 5 000 utilisateurs au cours des 6 derniers mois. Parmi ceux-ci, plus de 2 200 étaient actifs au cours des 14 derniers jours. Le chiffre noir (nombre d\'utilisateurs qui ont désactivé la télémétrie) ne peut être estimé.</li><li>Notre fil de discussion sur le forum a maintenant atteint presque 1 200 messages. C\'est beaucoup, mais le fil de discussion de la V.3, qui frôle actuellement les 3 500 réponses, est loin de nous rattraper.</li><li>Pour plus de statistiques, consultez notre discussion sur le forum:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li></ul><br>Nous attendons avec impatience de nombreux autres grands moments pendant la durée de vie de LSSM V.4 !<br>L\'équipe de LSSM<br>Jan, Sanni & Ron',
    },
    settings: {
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
};
