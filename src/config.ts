import browsers from './generated/browsers.json';

import type { Config } from '../typings/Config';

const PREFIX = 'lssmv4';
const PORT_ENV_KEY = 'LSSM_PORT';

export { PORT_ENV_KEY };

const isLocalServer =
    typeof process !== 'undefined' && PORT_ENV_KEY in process.env;

export default {
    admins: ['de_DE-205976', 'de_DE-675'],
    browser: browsers,
    discord: {
        invite: 'RcTNjpB',
        id: '254167535446917120',
        channels: {
            'suggestions': '607913643140579348',
            'lssm-help': '632909910895755264',
            'uptime': '649734648901009419',
        },
    },
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
            name: 'Missionchief.com',
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
        'core-modules': ['telemetry', 'releasenotes' /*, 'support'*/],
    },
    loadScript: {
        start: `${PREFIX}-load-script-start`,
        end: `${PREFIX}-load-script-end`,
    },
    userscript_latest_update: '4.7.0',
    prefix: PREFIX,
    urls: {
        server: isLocalServer
            ? `http://localhost:${process.env[PORT_ENV_KEY]}/`
            : 'https://v4.lss-manager.de/',
        docs: isLocalServer
            ? `http://localhost:${process.env[PORT_ENV_KEY]}/docs/`
            : 'https://docs.lss-manager.de/',
        statuspage: 'https://status.lss-manager.de/',
        donations: 'https://donate.lss-manager.de/',
        fontAwesomeIconSearch: 'https://fontawesome.com/v6/search?m=free',
    },
} as Config;
