import { Config } from '../typings/Config';

export default {
    admins: ['de_DE-205976', 'de_DE-675'],
    browser: {
        chrome: {
            latest: 87,
            supported: 84,
            download: 'https://chrome.com',
        },
        firefox: {
            latest: 83,
            supported: 79,
            download: 'https://firefox.com',
        },
        opera: {
            latest: 72,
            supported: 70,
            download: 'https://opera.com',
        },
        safari: {
            latest: 14,
            supported: 13,
            download: 'https://apple.com/safari/',
        },
        edge: {
            latest: 87,
            supported: 86,
            download: 'https://microsoft.com/edge',
        },
    },
    discord: 'https://discord.gg/RcTNjpB',
    discord_support:
        'https://discordapp.com/channels/254167535446917120/607913643140579348',
    games: {
        cs_CZ: {
            flag: '🇨🇿',
            name: 'Operacni-Stredisko.cz',
            shortURL: 'operacni-stredisko.cz',
            police: 'policie',
        },
        da_DK: {
            flag: '🇩🇰',
            name: 'Alarmcentral-Spil.dk',
            shortURL: 'alarmcentral-spil.dk',
            police: 'politi',
        },
        de_DE: {
            flag: '🇩🇪',
            name: 'Leitstellenspiel.de',
            shortURL: 'leitstellenspiel.de',
            police: 'polizei',
        },
        // el_GR: {
        //     flag: '🇬🇷',
        //     name: 'Missionchief Greece',
        //     shortURL: 'missionchief.gr',
        // },
        en_AU: {
            flag: '🇦🇺',
            name: 'Missionchief-Australia.com',
            shortURL: 'missionchief-australia.com',
            police: 'police',
        },
        en_GB: {
            flag: '🇬🇧',
            name: 'Missionchief.co.uk',
            shortURL: 'missionchief.co.uk',
            police: 'police',
        },
        en_US: {
            flag: '🇺🇸',
            name: 'Missionschief.com',
            shortURL: 'missionchief.com',
            police: 'police',
        },
        es_ES: {
            flag: '🇪🇸',
            name: 'Centro-de-Mando.es',
            shortURL: 'centro-de-mando.es',
        },
        es_MX: {
            flag: '🇲🇽',
            name: 'Centro-de-Mando.mx',
            shortURL: 'centro-de-mando.mx',
        },
        fi_FI: {
            flag: '🇫🇮',
            name: 'Hätäkeskuspeli.com',
            shortURL: 'hatakeskuspeli.com',
            police: 'poliisi',
        },
        fr_FR: {
            flag: '🇫🇷',
            name: 'Operateur112.fr',
            shortURL: 'operateur112.fr',
            police: 'police',
        },
        it_IT: {
            flag: '🇮🇹',
            name: 'Operatore112.it',
            shortURL: 'operatore112.it',
            police: 'polizia',
        },
        ja_JP: {
            flag: '🇯🇵',
            name: 'Missionchief-Japan.com',
            shortURL: 'missionchief-japan.com',
        },
        ko_KR: {
            flag: '🇰🇷',
            name: 'Missionchief-Korea.com',
            shortURL: 'missionchief-korea.com',
        },
        nb_NO: {
            flag: '🇳🇴',
            name: 'Nodsentralspillet.com',
            shortURL: 'nodsentralspillet.com',
            police: 'politiet',
        },
        nl_NL: {
            flag: '🇳🇱',
            name: 'Meldkamerspel.com',
            shortURL: 'meldkamerspel.com',
            police: 'politie',
        },
        pl_PL: {
            flag: '🇵🇱',
            name: 'Operatorraunkowy.pl',
            shortURL: 'operatorratunkowy.pl',
            police: 'policja',
        },
        pt_BR: {
            flag: '🇧🇷',
            name: 'Operador193.com',
            shortURL: 'operador193.com',
        },
        pt_PT: {
            flag: '🇵🇹',
            locale_fallback: 'en_US',
            name: 'Jogo-operador112.com',
            shortURL: 'jogo-operador112.com',
            police: 'policia',
        },
        ro_RO: {
            flag: '🇷🇴',
            name: 'Jocdispecerat112.com',
            shortURL: 'jocdispecerat112.com',
        },
        ru_RU: {
            flag: '🇷🇺',
            name: 'Dispetcher112.ru',
            shortURL: 'dispetcher112.ru',
        },
        sk_SK: {
            flag: '🇸🇰',
            locale_fallback: 'en_US',
            name: 'Dispečerskom-centrum.com',
            shortURL: 'dispecerske-centrum.com',
        },
        sv_SE: {
            flag: '🇸🇪',
            name: 'Larmcentralen-spelet.se',
            shortURL: 'larmcentralen-spelet.se',
            police: 'polis',
        },
        tr_TR: {
            flag: '🇹🇷',
            name: '112-Merkez.com',
            shortURL: '112-merkez.com',
        },
        uk_UA: {
            flag: '🇺🇦',
            name: 'Dyspetcher101-game.com',
            shortURL: 'dyspetcher101-game.com',
        },
    },
    github: {
        repo: 'LSS-Manager/LSSM-V.4',
    },
    modules: {
        'core-modules': ['telemetry', 'releasenotes', 'support'],
    },
    prefix: 'lssmv4',
    server: 'https://jxn.v4.lssm.ledbrain.de/',
} as Config;
