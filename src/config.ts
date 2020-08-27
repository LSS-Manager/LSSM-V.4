import { Config } from '../typings/Config';

export default {
    admins: ['de_DE-205976', 'de_DE-675'],
    browser: {
        chrome: {
            latest: 84,
            supported: 84,
            download: 'https://chrome.com',
        },
        firefox: {
            latest: 79,
            supported: 79,
            download: 'https://firefox.com',
        },
        opera: {
            latest: 70,
            supported: 70,
            download: 'https://opera.com',
        },
        safari: {
            latest: 13,
            supported: 13,
            download: 'https://apple.com/safari/',
        },
    },
    discord: 'https://discord.gg/RcTNjpB',
    discord_support:
        'https://discordapp.com/channels/254167535446917120/607913643140579348',
    games: {
        cs_CZ: {
            flag: '🇨🇿',
            locale_fallback: 'en_US',
            name: 'Operacni-Stredisko.cz',
            shortURL: 'operacni-stredisko.cz',
        },
        da_DK: {
            flag: '🇩🇰',
            locale_fallback: 'en_US',
            name: 'Alarmcentral-Spil.dk',
            shortURL: 'alarmcentral-spil.dk',
        },
        de_DE: {
            flag: '🇩🇪',
            name: 'Leitstellenspiel.de',
            shortURL: 'leitstellenspiel.de',
        },
        el_GR: {
            flag: '🇬🇷',
            locale_fallback: 'en_US',
            name: 'Missionchief Greece',
            shortURL: 'missionchief.gr',
        },
        en_AU: {
            flag: '🇦🇺',
            locale_fallback: 'en_GB',
            name: 'Missionchief-Australia.com',
            shortURL: 'missionchief-australia.com',
        },
        en_GB: {
            flag: '🇬🇧',
            locale_fallback: 'en_US',
            name: 'Missionchief.co.uk',
            shortURL: 'missionchief.co.uk',
        },
        en_US: {
            flag: '🇺🇸',
            locale_fallback: 'de_DE',
            name: 'Missionschief.com',
            shortURL: 'missionchief.com',
        },
        es_ES: {
            flag: '🇪🇸',
            locale_fallback: 'en_US',
            name: 'Centro-de-Mando.es',
            shortURL: 'centro-de-mando.es',
        },
        es_MX: {
            flag: '🇲🇽',
            locale_fallback: 'es_ES',
            name: 'Centro-de-Mando.mx',
            shortURL: 'centro-de-mando.mx',
        },
        fi_FI: {
            flag: '🇫🇮',
            locale_fallback: 'en_US',
            name: 'Hätäkeskuspeli.com',
            shortURL: 'hatakeskuspeli.com',
        },
        fr_FR: {
            flag: '🇫🇷',
            locale_fallback: 'en_US',
            name: 'Operateur112.fr',
            shortURL: 'operateur112.fr',
        },
        it_IT: {
            flag: '🇮🇹',
            locale_fallback: 'en_US',
            name: 'Operatore112.it',
            shortURL: 'operatore112.it',
        },
        ja_JP: {
            flag: '🇯🇵',
            locale_fallback: 'en_US',
            name: 'Missionchief-Japan.com',
            shortURL: 'missionchief-japan.com',
        },
        ko_KR: {
            flag: '🇰🇷',
            locale_fallback: 'en_US',
            name: 'Missionchief-Korea.com',
            shortURL: 'missionchief-korea.com',
        },
        nb_NO: {
            flag: '🇳🇴',
            locale_fallback: 'en_US',
            name: 'Nodsentralspillet.com',
            shortURL: 'nodsentralspillet.com',
        },
        nl_NL: {
            flag: '🇳🇱',
            locale_fallback: 'en_GB',
            name: 'Meldkamerspel.com',
            shortURL: 'meldkamerspel.com',
        },
        pl_PL: {
            flag: '🇵🇱',
            locale_fallback: 'en_US',
            name: 'Operatorraunkowy.pl',
            shortURL: 'operatorratunkowy.pl',
        },
        pt_BR: {
            flag: '🇧🇷',
            locale_fallback: 'pt_PT',
            name: 'Operador193.com',
            shortURL: 'operador193.com',
        },
        pt_PT: {
            flag: '🇵🇹',
            locale_fallback: 'en_US',
            name: 'Jogo-operador112.com',
            shortURL: 'jogo-operador112.com',
        },
        ro_RO: {
            flag: '🇷🇴',
            locale_fallback: 'en_US',
            name: 'Jocdispecerat112.com',
            shortURL: 'jocdispecerat112.com',
        },
        ru_RU: {
            flag: '🇷🇺',
            locale_fallback: 'en_US',
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
            locale_fallback: 'en_US',
            name: 'Larmcentralen-spelet.se',
            shortURL: 'larmcentralen-spelet.se',
        },
        tr_TR: {
            flag: '🇹🇷',
            locale_fallback: 'en_US',
            name: '112-Merkez.com',
            shortURL: '112-merkez.com',
        },
        uk_UA: {
            flag: '🇺🇦',
            locale_fallback: 'en_US',
            name: 'Dyspetcher101-game.com',
            shortURL: 'dyspetcher101-game.com',
        },
    },
    github: {
        repo: 'KBOE2/LSSM-V.4',
    },
    modules: {
        'core-modules': ['telemetry', 'releasenotes', 'support'],
    },
    prefix: 'lssmv4',
    server: 'https://v4.lssm.ledbrain.de/',
} as Config;
