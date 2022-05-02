// import { Building } from 'typings/Building';

const modules = {
    appstore: {
        save: 'Save',
        reset: 'Reset',
        noMapkit:
            'This module does not work with the map type "Mapkit" due to limitations of Mapkit!',
        dev: 'This module is currently still under development. Activating it can lead to incomplete and faulty functions!',
        closeWarning: {
            title: 'Unsaved changes',
            text: 'You made changes in the AppStore that have not yet been saved. Reset them or save them to close the AppStore.',
            abort: 'Cancel',
            saveAndExit: 'Save and Exit',
            exit: 'Exit without saving',
        },
    },
    settings: {
        name: 'Settings',
        save: 'Save',
        discard: 'Discard changes',
        reset: 'Reset',
        export: 'Export',
        import: 'Import',
        appendableList: {
            unique: {
                title: 'double value',
                text: 'There must be no duplicate values in the **{title}** column. The value **{value}** already exists!',
                confirm: 'OK',
            },
        },
        resetWarning: {
            title: 'Reset the settings',
            text: 'Do you really want to reset settings to their default values? This cannot be undone!',
            close: 'Cancel',
            total: 'All settings',
            module: 'Only from this module',
        },
        resetWarningSetting: {
            title: 'Reset settings',
            text: 'Do you really want to reset this one setting <b>{setting}</b> of the module <b>{module}</b> to its default value?',
            close: 'Cancel',
            reset: 'Reset',
        },
        closeWarning: {
            title: 'Unsaved changes',
            text: 'You have made changes in the settings that are not yet saved. Reset them, discard them or save them to close the settings.',
            abort: 'Cancel',
            saveAndExit: 'Save and Exit',
            exit: 'Exit without saving',
        },
        changeList: {
            true: 'On',
            false: 'Off',
        },
        locationSelect: {
            location: 'Select position',
            zoom: 'Select position and zoom',
            sync: 'use current position',
        },
    },
} as Record<string, Record<string, unknown>>;

export default {
    modules,
    error: {
        title: 'LSS Manager: Error',
        msg: 'If this error occurs frequently, please report it to the LSSM team!',
        requestIssue: {
            title: 'Erroneous request: Status {status}',
            text: `Ouch, unfortunately an error occurred with this server request:<br>
<b>Status</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>URL</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Feature</b>: <code>{feature}</code><br>
<b>Duration</b>: <code>{duration}ms</code><br>
<b>User</b>: <code>{uid}</code><br>
<b>Timestamp</b>: <code>{timestamp}</code>
<br>
Please try to perform the desired action again.<br>
If several requests fail in a short time, this could be due to server problems. Please try again at a later time.`,
            close: 'Dismiss',
        },
    },
    warnings: {
        version: {
            title: 'Wrong LSS Manager version',
            text: 'Dear user, unfortunately we had to discover that you do not have the latest version of LSS Manager. The latest version is {version}, but you have {curver} first. Please reload the game without cache (with Ctrl + F5, on Apple devices command + R), this should fix the bug. If the error persists, please report it to the team! If you use a wrong version we cannot guarantee the full functionality of the LSS-Manager.',
            close: 'Close message and reload game (recommended)',
            abort: 'Close message without reloading game',
        },
    },
    anniversary1: {
        closeNote: 'Tip: You can also click on the balloons to close!',
        title: '🎉 There is reason to celebrate! 🎉',
        content:
            'Wow, how fast time flies!<br>It\'s been <b>one year</b> since the LSS Manager V.4 went online! A lot has happened this year, of course, and so on this special occasion we would like to say a special thank you to you, the users. The joy with which you test our new features inspires us again and again and gives us new motivation to continue. Also, a big thank you goes out to our translators who volunteer their time to make the LSSM usable in other versions of the game.</br>To celebrate, we\'d like to share a few facts and figures here:<ul><li><code>February 10th 2020</code>: The First Commit on GitHub was made: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Since then we have made over 5,600 commits!</li><li><code>September 19th, 2020</code>: V.4 was officially announced for the first time on the forum: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. With this, the application phase for beta testers has also started</li><li><code>October 17th 2020</code>: Beta testers have been given access to V.4 for the first time. The 4-week beta phase has thus started</li><li><code>November 21st 2020</code>: LSS Manager V.4 goes online for everyone!</li><li>Our telemetry currently records around 5,000 users in the past 6 months. Of these, over 2,200 were active in the last 14 days. The dark figure (number of users who have deactivated telemetry) can not be estimated.</li><li>Our thread in the forum has now reached almost 1,200 messages. That\'s quite a bit, but the V.3 thread, which is currently scratching the 3,500 responses, is far from catching up.</li><li>For more stats, check out our thread in the forum:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li></ul><br>We\'re looking forward to many more great moments in the time of LSSM V.4!<br>Your LSSM Team<br>Jan, Sanni & Ron',
    },
    globalSettings: {
        name: 'General Settings',
        labelInMenu: {
            title: 'Label instead of icon in menu',
            description:
                'Displays a simple label in the navigation bar instead of the LSSM logo',
        },
        allowTelemetry: {
            description:
                'Controls whether LSS-Manager is allowed to send Data which helps us in developing this extension.',
            title: 'Allow Telemetry',
        },
        iconBg: {
            description: 'Change the background of LSSM-Icon!',
            title: 'LSSM-Icon Background',
        },
        iconBgAsNavBg: {
            description:
                'Color the whole navbar in the color of LSSM-Icon Background!',
            title: 'colorize navbar',
        },
        loadingIndicator: {
            description:
                'If this setting is active, LSSM displays a small loading circle in the lower right corner when it loads its own files.',
            title: 'show loading progress',
        },
        osmDarkTooltip: {
            description:
                'This setting darkens tooltips on map if you have enabled dark mode.',
            title: 'Dark tooltips on map',
        },
        osmDarkControls: {
            description:
                'This setting darkens buttons on map if you have enabled dark mode.',
            title: 'Dark buttons on map',
        },
        v3MenuAsSubmenu: {
            title: 'V3 Menu as sub-menu',
            description:
                'Moves the menu of the LSSM V3 to the menu of the V4 to save some space in the navigation bar.',
        },
    },
    vehicles: {
        0: {
            caption: 'Water Ladder',
            color: '#cc0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 9,
            possibleBuildings: [0, 18],
            special: 'A standard pump used for fighting fires.',
        },
        1: {
            caption: 'Light 4X4 Pump (L4P)',
            color: '#bb0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 5,
            possibleBuildings: [0, 18],
            special: 'A smaller pump used in rural areas, will act as a pump.',
        },
        2: {
            caption: 'Aerial Appliance',
            color: '#d92626',
            coins: 30,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special:
                'Required once you have built 3 fire stations. An Aerial Asset, very useful for fighting fires in high rises and rescuing people.',
        },
        3: {
            caption: 'Fire Officer',
            color: '#d02525',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18, 22],
            special:
                'Required once you have built 6 fire stations. A small car used for transporting Station Managers+ to calls, not uncommon to see 6-8 of these at Major Incidents.',
        },
        4: {
            caption: 'Rescue Support Unit (RSU)',
            color: '#ad1f1f',
            coins: 25,
            credits: 12_180,
            minPersonnel: 1,
            maxPersonnel: 5,
            possibleBuildings: [0, 18],
            special:
                'Required once you have built 4 fire stations. A big lorry with specialist rescue equipment, useful for Road Traffic Collisions.',
        },
        5: {
            caption: 'Ambulance',
            color: '#9c871c',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 2, 20, 21, 25],
            special:
                'A standard ambulance for tackling your medical emergencys.',
        },
        6: {
            caption: 'Water Carrier',
            color: '#aa0000',
            coins: 25,
            credits: 17_300,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special:
                'Required once you have built 7 fire stations. Used for conveying water to a fire, useful for rural fires.',
        },
        7: {
            caption: 'HazMat Unit',
            color: '#990000',
            coins: 25,
            credits: 17_300,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 18],
            schooling: {
                'Fire Station': {
                    HazMat: {
                        all: true,
                    },
                },
            },
            special:
                'Required once you have built 11 fire stations. A HazMat unit which can be used for a range of hazardous calls. ',
        },
        8: {
            caption: 'Incident response vehicle (IRV)',
            color: '#188b35',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19, 26],
            special: 'A standard patrol car for tackling your police calls.',
        },
        9: {
            caption: 'HEMS',
            color: '#e68319',
            coins: 30,
            credits: 300_000,
            minPersonnel: 3,
            maxPersonnel: 5,
            possibleBuildings: [5],
            schooling: {
                Rescue: {
                    'Critical care': {
                        all: true,
                    },
                },
            },
            special: 'An Air Ambulance for the most serious cases.',
        },
        10: {
            caption: 'Rapid Response Vehicle',
            color: '#b89d14',
            coins: 20,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [0, 2, 5, 20, 21, 22, 25],
            special:
                'A fast and angile ambulance car, very useful when a ambulance has a long response time.',
        },
        11: {
            caption: 'Police Helicopter',
            color: '#0a7c16',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [13],
            schooling: {
                Police: {
                    'Police aviation': {
                        all: true,
                    },
                },
            },
            special:
                'A Police Helicopter, useful for pursuits and firearms attacks.',
        },
        12: {
            caption: 'Dog Support Unit (DSU)',
            color: '#1f7915',
            coins: 25,
            credits: 7000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19, 22, 26],
            schooling: {
                Police: {
                    'Dog handling': {
                        all: true,
                    },
                },
            },
            special:
                'Required once you have built 6 police stations. Acts as a Dog Support Unit (DSU) and Incident Response Vehicle. A dog for tracking and chasing criminals.',
        },
        13: {
            caption: 'Armed Response Vehicle (ARV)',
            color: '#438a17',
            coins: 23,
            credits: 7000,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [6, 19, 26],
            schooling: {
                Police: {
                    'Firearms training': {
                        all: true,
                    },
                },
            },
            special:
                'Required once you have built 8 police stations. Acts as a Armed Response Vehicle and Incident Response Vehicle. Firearms unit for the worst calls.',
        },
        14: {
            caption: 'BASU',
            color: '#ca1616',
            credits: 11_680,
            coins: 25,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special:
                'Required from 5 fire stations. Carrys air tanks to a call.',
        },
        15: {
            caption: 'ICCU',
            color: '#791515',
            coins: 25,
            credits: 25_500,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 18],
            schooling: {
                'Fire Station': {
                    'Mobile command': {
                        all: true,
                    },
                },
            },
            special:
                'Required once you have built 13 fire stations. A command post for Major Incidents.',
        },
        16: {
            caption: 'Rescue Pump',
            color: '#dc1818',
            coins: 25,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 9,
            possibleBuildings: [0, 18],
            special:
                'To purchase with credits it requires the rank: Captain or Superintendent, <br>Lower ranked members can purchase the vehicle for 25 Coins. A Pump with extraction tools. Perfect for your Road Traffic Collisions.',
        },
        17: {
            caption: 'CARP',
            color: '#dc1818',
            coins: 25,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 18],
            special:
                'To purchase with credits it requires the rank: Captain or Superintendent, <br>Lower ranked members can purchase the vehicle for 25 Coins. A Pump with an Aerial Asset on top, perfect for high rise fires and rescuing people form tall buildings.',
        },
        18: {
            caption: 'Co-Responder Vehicle',
            color: '#bb2222',
            coins: 25,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [0, 18],
            schooling: {
                'Fire Station': {
                    'Co-Responder Training': {
                        all: true,
                    },
                },
            },
            special:
                'A Rapid Response Vehicle operated by the fire service where there is little to no ambulance coverage.',
        },
        19: {
            caption: 'Joint Response Unit',
            color: '#48832e',
            coins: 30,
            credits: 6000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [2, 6, 19, 20, 25, 26],
            special:
                'Acts as a Rapid Response Vehicle and Incident Response Vehicle. Perfect for calls that need police and alot of ambulances.',
        },
        20: {
            caption: 'Operational Team Leader',
            color: '#997122',
            coins: 25,
            credits: 20_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [2, 20, 21, 22, 25],
            special:
                'Required from 6 ambulance stations. A medical command unit, usefull for co-ordinating scenes.',
        },
        21: {
            caption: 'General Practitioner',
            color: '#99631f',
            coins: 20,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [21, 22],
            schooling: {
                Rescue: {
                    'Critical care': {
                        all: true,
                    },
                },
            },
            special:
                'Can only be placed at the Home Response Location and Clinic. A General Practitioner that can respond as a on call doctor currently. ',
        },
        22: {
            caption: 'Community First Responder',
            color: '#996719',
            coins: 12,
            credits: 2500,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [22],
            special:
                'Can only be placed at the Home Response Location. A ambulance Rapid Response Vehicle but staffed with volunteers',
        },
        23: {
            caption: 'Crew Carrier',
            color: '#662222',
            coins: 10,
            credits: 8000,
            minPersonnel: 1,
            maxPersonnel: 12,
            possibleBuildings: [0, 2, 18, 20, 25],
            special: 'Transporting many staff to a scene.',
        },
        24: {
            caption: 'Traffic Car',
            color: '#3a5522',
            coins: 35,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19, 26],
            schooling: {
                Police: {
                    'Roads Policing Officer Training': {
                        all: true,
                    },
                },
            },
            special:
                'Acts as a Traffic Car and Incident Response Vehicle. A pursuit vehicle for high speed chases as well as RTCs.',
        },
        25: {
            caption: 'Armed Traffic Car',
            color: '#577529',
            coins: 35,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19, 26],
            schooling: {
                Police: {
                    'Firearms training': {
                        all: true,
                    },
                    'Roads Policing Officer Training': {
                        all: true,
                    },
                },
            },
            special:
                'Requires both, Firearms training and Roads Policing Officer Training. Works as a Traffic Car, Armed Response Vehicle and an Incident Response Vehicle. For highspeed chases and firearms incidents. ',
        },
        26: {
            caption: 'Heavy 4x4 Tanker',
            color: '#aa0000',
            coins: 25,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special:
                'Unlocked at Fire Apparatus Operator or Sergeant Rank. Works as a Water Carrier and Water Ladder. Used in rural areas to save money.',
        },
        27: {
            caption: 'PRV',
            color: '#99631f',
            coins: 20,
            credits: 12_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [25],
            schooling: {
                Rescue: {
                    'HART Training': {
                        all: true,
                    },
                },
            },
            special:
                'Responds to the most serious of calls, where lives are in serious danger.',
        },
        28: {
            caption: 'SRV',
            color: '#99631f',
            coins: 20,
            credits: 12_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [25],
            schooling: {
                Rescue: {
                    'HART Training': {
                        all: true,
                    },
                },
            },
            special:
                'Responds to the most serious of calls, where lives are in serious danger.',
        },
        29: {
            caption: 'Welfare Vehicle',
            color: '#99631f',
            coins: 25,
            credits: 15_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 18, 25],
            special:
                'Responds to the most serious of calls, Used for Major Fires.',
        },
        30: {
            caption: 'ATV Carrier',
            color: '#99631f',
            coins: 20,
            credits: 12_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [25],
            schooling: {
                Rescue: {
                    'HART Training': {
                        all: true,
                    },
                },
            },
            special:
                'Responds to the most serious of calls, where lives are in serious danger in ruarl areas.',
        },
        31: {
            caption: 'Ambulance Control Unit',
            color: '#99631f',
            coins: 25,
            credits: 50_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [2, 20, 21, 25],
            schooling: {
                Rescue: {
                    'Tactical Command Course': {
                        all: true,
                    },
                },
            },
            special:
                'Command Post run by the ambulance service for the most serious of calls.',
        },
        32: {
            caption: 'CBRN Vehicle',
            color: '#99631f',
            coins: 25,
            credits: 20_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [2, 20, 21, 25],
            schooling: {
                Rescue: {
                    'SORT Training': {
                        all: true,
                    },
                },
            },
            special: 'A HazMat run by the ambulance service.',
        },
        33: {
            caption: 'Mass Casualty Equipment',
            color: '#99631f',
            coins: 15,
            credits: 15_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [2, 20, 25],
            schooling: {
                Rescue: {
                    'SORT Training': {
                        all: true,
                    },
                },
            },
            special:
                'You can buy 1 Mass Casualty Equipment for every 20 ambulance stations (respectively 15 with premium account). It is required for missions that can spawn with over 30 patients',
        },
        34: {
            caption: 'Ambulance Officer',
            color: '#99631f',
            coins: 15,
            credits: 25_500,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [2, 20, 22, 25],
            schooling: {
                Rescue: {
                    'Ambulance Officer': {
                        all: true,
                    },
                },
            },
            special:
                'Required once you have built 15 Rescue stations. It is required for missions that can spawn with over 20 patients to help command the scene.',
        },
        35: {
            caption: 'BFU',
            color: '#aa0000',
            coins: 10,
            credits: 17_300,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 18],
            special:
                'Bulk Foam Unit, Fufills the foam unit requirement on missions. Used on hazardous fires and electrical fires.',
        },
        36: {
            caption: 'F/WrC',
            color: '#aa0000',
            coins: 15,
            credits: 45_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 18],
            special:
                'Acts as a Bulk Foam Unit and a Water Carrier. Used on hazardous fires and electrical fires.',
        },
        37: {
            caption: 'WrL CAFS',
            color: '#aa0000',
            coins: 10,
            credits: 17_300,
            minPersonnel: 2,
            maxPersonnel: 9,
            possibleBuildings: [0, 18],
            special:
                'Acts as a Bulk Foam Unit and a Water Ladder (Pump). Used On any fire but also has the capability to use foam to extinguish a fire.',
        },
        38: {
            caption: 'RP CAFS',
            color: '#aa0000',
            coins: 10,
            credits: 25_000,
            minPersonnel: 2,
            maxPersonnel: 9,
            possibleBuildings: [0, 18],
            special:
                'Acts as a Bulk Foam Unit, Rescue Support Vehicle and a Pump. Used on any fire, foam capabilty as well as being useful at RTCs.',
        },
        39: {
            caption: 'OSU',
            color: '#aa0000',
            coins: 15,
            credits: 30_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            schooling: {
                'Fire Station': {
                    HazMat: {
                        all: true,
                    },
                },
            },
            possibleBuildings: [0, 18],
            special:
                'Requires the rank Staff Captain or Chief Superintendent. Acts as a Breathing Appartus Support Unit, HazMat Unit and a Welfare Unit. This unit will supply HazMat Resources, additional air tanks and a welfare location. ',
        },
        40: {
            caption: 'PM',
            color: '#aa0000',
            coins: 10,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 18],
            special:
                'Carries Every Pod, which are different types of vehicles on the back of a lorry.',
        },
        41: {
            caption: 'Water Pod',
            color: '#aa0000',
            coins: 8,
            credits: 17_300,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0, 18],
            special: 'Acts as a Water Carrier.',
        },
        42: {
            caption: 'Bulk Foam Pod',
            color: '#aa0000',
            coins: 8,
            credits: 17_300,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0, 18],
            special:
                'Acts as a Bulk Foam Unit. Used on hazardous fires and electrical fires.',
        },
        43: {
            caption: 'Rescue Pod',
            color: '#aa0000',
            coins: 8,
            credits: 12_180,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0, 18],
            special: 'Acts as a Rescue Support Unit.',
        },
        44: {
            caption: 'Command Pod',
            color: '#aa0000',
            coins: 8,
            credits: 25_500,
            minPersonnel: 0,
            maxPersonnel: 0,
            schooling: {
                'Fire Station': {
                    'Mobile Command': {
                        all: true,
                    },
                },
            },
            special:
                'Requires special education for personnel on Prime Mover (Mobile command). Acts as a Incident Command and Control Unit and a Fire Officer.',
            possibleBuildings: [0, 18],
        },
        45: {
            caption: 'Welfare Pod',
            color: '#aa0000',
            coins: 8,
            credits: 15_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0],
            special: 'Acts as a Welfare Unit.',
        },
        46: {
            caption: 'BASU Pod',
            color: '#aa0000',
            coins: 8,
            credits: 11_680,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0, 18],
            special: 'Acts as a Breathing Appartus Support Unit.',
        },
        47: {
            caption: 'Misting Pod',
            color: '#aa0000',
            coins: 8,
            credits: 5000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0, 18],
            special: 'Acts as a Light 4x4 Pump Unit.',
        },
        48: {
            caption: 'Hazardous Materials Pod',
            color: '#aa0000',
            coins: 8,
            credits: 19_200,
            minPersonnel: 0,
            maxPersonnel: 0,
            schooling: {
                'Fire Station': {
                    HazMat: {
                        all: true,
                    },
                },
            },
            special:
                'Requires special education for personnel on Prime Mover (HazMat). Acts as a HazMat Unit.',
            possibleBuildings: [0, 18],
        },
        49: {
            caption: 'OSU Pod',
            color: '#aa0000',
            coins: 8,
            credits: 30_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            schooling: {
                'Fire Station': {
                    HazMat: {
                        all: true,
                    },
                },
            },
            special:
                'Requires special education for personnel in Prime Mover (HazMat). Acts as a Hazmat Unit, Welfare Unit and a Breathing Apparatus Support Unit.',
            possibleBuildings: [0, 18],
        },
        50: {
            caption: 'HVP',
            color: '#aa0000',
            coins: 8,
            credits: 20_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            schooling: {
                'Fire Station': {
                    'High Volume Pump Training': {
                        all: true,
                    },
                },
            },
            special:
                'Requires special education for personnel on Prime Mover (High Volume Pump Training). Acts as a Water Carrier.',
            possibleBuildings: [0, 18],
        },
        51: {
            caption: 'PSU Carrier',
            color: '#3a5522',
            coins: 8,
            credits: 8000,
            minPersonnel: 1,
            maxPersonnel: 9,
            possibleBuildings: [6, 26],
            special:
                'This Police Support Unit, carrys a large amount of officers (usally riot trained) to scenes.',
        },
        52: {
            caption: 'Firearms Personnel Carrier',
            color: '#3a5522',
            coins: 15,
            credits: 8000,
            minPersonnel: 1,
            maxPersonnel: 9,
            possibleBuildings: [6, 26],
            schooling: {
                Police: {
                    'Firearms training': {
                        all: true,
                    },
                },
            },
            special:
                'A Large Van carrying Firearms Officers to scenes and reducing the amount of armed vehicles needed.',
        },
        53: {
            caption: 'Multiple Dog Carrier',
            color: '#3a5522',
            coins: 15,
            credits: 50_000,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [6, 26],
            schooling: {
                Police: {
                    'Dog handling': {
                        all: true,
                    },
                },
            },
            special: 'A dog carrier which transports mutiple dogs to a scene.',
        },
        54: {
            caption: 'Detention Van',
            color: '#3a5522',
            coins: 15,
            credits: 26_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 26],
            special:
                'This is a Large Cell Van used in order to transport multiple suspects to custody at once, 4 prisoners will be transported.',
        },
        55: {
            caption: 'Mounted Unit',
            color: '#3a5522',
            coins: 15,
            credits: 15_000,
            minPersonnel: 1,
            maxPersonnel: 8,
            possibleBuildings: [6, 26],
            schooling: {
                Police: {
                    'Mounted Training': {
                        all: true,
                    },
                },
            },
            special:
                'This unit will transport horses form stables to riots in order to get a higher view of what is happening in the crowd.',
        },
        56: {
            caption: 'M-RAV',
            color: '#3a5522',
            coins: 23,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [6, 19, 26],
            schooling: {
                Police: {
                    'Firearms training': {
                        all: true,
                    },
                },
            },
            special:
                'This is a armoured vehicle transporting 6 firearms officers.',
        },
    },
    buildings: {
        0: {
            caption: 'Fire station',
            color: '#bb0000',
            coins: 30,
            credits: 100_000,
            extensions: [
                {
                    caption: 'Ambulance extension',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Days',
                },
                {
                    caption: 'Airport extension',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Days',
                },
                {
                    caption: 'Foam Extension',
                    credits: 150_000,
                    coins: 15,
                    duration: '5 Days',
                },
                {
                    caption: 'Swap Body Parking Space',
                    credits: 50_000,
                    coins: 20,
                    duration: '7 Days',
                },
                ...new Array(11).fill({
                    caption: 'Swap Body Parking Space',
                    credits: 50_000,
                    coins: 20,
                    duration: '7 Days',
                }),
                {
                    caption: 'Water rescue expansion',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Days',
                },
            ],
            levelcost: ['1. 10.000', '2. 50.000', '3.-24. 100.000'],
            maxBuildings: '6.000 together with small fire stations',
            maxLevel: 24,
            special:
                'From the 24th fire station onwards, the cost of building a new fire station increases according to the following formula: <code>100.000+200.000*LOG<sub>2</sub>(Number of existing fire stations − 22)</code>. The Coins price remains constant!',
            startPersonnel: 10,
            startVehicles: ['Water Ladder', 'Light 4X4 Pump (L4P)'],
            schoolingTypes: ['Fire Station'],
            maxBuildingsFunction: (): number => 6000,
        },
        1: {
            caption: 'Fire academy',
            color: '#992222',
            coins: 50,
            credits: 500_000,
            extensions: new Array(3).fill({
                caption: 'Additional classroom',
                credits: 400_000,
                coins: 40,
                duration: '7 Days',
            }),
            levelcost: [],
            maxBuildings: 'No limit',
            maxLevel: 0,
            special:
                "Finance Admins and admins can (expand) fire department schools with the help of credits from the association's funds. Alliance Educators and admins can start training courses at association fire- brigade schools.",
            startPersonnel: 0,
            startVehicles: [],
        },
        2: {
            caption: 'Ambulance station',
            color: '#ffa500',
            coins: 35,
            credits: 200_000,
            extensions: [
                {
                    caption: 'Mass Casualty Extension',
                    credits: 150_000,
                    coins: 20,
                    duration: '5 Days',
                },
            ],
            levelcost: ['1. 10.000', '2. 50.000', '3.-19. 100.000'],
            maxBuildings: 'No limit',
            maxLevel: 19,
            special: '',
            startPersonnel: 3,
            startVehicles: ['Ambulance'],
            schoolingTypes: ['Rescue'],
        },
        3: {
            caption: 'Rescue (EMS) Academy',
            color: '#8c852c',
            coins: 50,
            credits: 500_000,
            extensions: [
                ...new Array(3).fill({
                    caption: 'Additional classroom',
                    credits: 400_000,
                    coins: 40,
                    duration: '7 Days',
                }),
            ],
            levelcost: [],
            maxBuildings: 'No limit',
            maxLevel: 0,
            special:
                "Finance Admins and admins can (expand) association rescue schools with the help of credits from the association's funds. Alliance Educators and admins can start training courses at association rescue schools.",
            startPersonnel: 0,
            startVehicles: [],
        },
        4: {
            caption: 'Hospital',
            color: '#bbe944',
            coins: 25,
            credits: 200_000,
            extensions: [
                {
                    caption: 'General Internal',
                    credits: 10_000,
                    coins: 10,
                    duration: '7 Days',
                },
                {
                    caption: 'General Surgeon',
                    credits: 10_000,
                    coins: 10,
                    duration: '7 Days',
                },
                {
                    caption: 'Gynecology',
                    credits: 70_000,
                    coins: 15,
                    duration: '7 Days',
                },
                {
                    caption: 'Urology',
                    credits: 70_000,
                    coins: 15,
                    duration: '7 Days',
                },
                {
                    caption: 'Traumatology',
                    credits: 70_000,
                    coins: 15,
                    duration: '7 Days',
                },
                {
                    caption: 'Neurology',
                    credits: 70_000,
                    coins: 15,
                    duration: '7 Days',
                },
                {
                    caption: 'Neurosurgery',
                    credits: 70_000,
                    coins: 15,
                    duration: '7 Days',
                },
                {
                    caption: 'Cardiology',
                    credits: 70_000,
                    coins: 15,
                    duration: '7 Days',
                },
                {
                    caption: 'Cardiac Surgery',
                    credits: 70_000,
                    coins: 15,
                    duration: '7 Days',
                },
            ],
            levelcost: ['1.-20. 19.000 Credits / 11 Coins'],
            maxBuildings: 'No limit',
            maxLevel: 20,
            special:
                'Finance ministers and admins can (expand) association hospitals with the help of credits from the association treasury.',
            startPersonnel: 0,
            startVehicles: [],
        },
        5: {
            caption: 'Medical Helicopter station',
            color: '#e7ad2f',
            coins: 50,
            credits: 1_000_000,
            extensions: [],
            levelcost: ['1.000.000 / 50 Coins'],
            maxBuildings: 'see specials',
            maxLevel: 2,
            special:
                'Up to the 125th building (of all types) a total of max. 4 landing sites can be built. After that the number increases by 1 every 25 buildings (starting at the 125th).',
            startPersonnel: 1,
            startVehicles: [],
            schoolingTypes: ['Rescue'],
            maxBuildingsFunction: (buildingsAmountTotal: number): number =>
                buildingsAmountTotal < 125
                    ? 4
                    : Math.floor(buildingsAmountTotal / 25),
        },
        6: {
            caption: 'Police station',
            color: '#007700',
            coins: 35,
            credits: 100_000,
            extensions: [
                {
                    caption: 'Prison cell',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Days',
                },
                ...new Array(9).fill({
                    caption: 'Additional cell',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Days',
                }),
                {
                    caption: 'Police & Public Safety Extension',
                    credits: 100_000,
                    coins: 15,
                    duration: '7 Days',
                },
                {
                    caption: 'Additional Detention Van Parking Spaces',
                    credits: 100_000,
                    coins: 15,
                    duration: '5 Days',
                },
            ],
            levelcost: ['1. 10.000', '2. 50.000', '3.-19. 100.000'],
            maxBuildings: '1.700 together with small police stations',
            maxLevel: 19,
            special:
                'From the 24th police station onwards, the costs for the new construction of a police station increase according to the following formula: <code>100.000+200.000*LOG<sub>2</sub>(Number of existing police stations − 22)</code>. The Coins price remains constant!',
            startPersonnel: 2,
            startVehicles: ['Incident response vehicle (IRV)'],
            schoolingTypes: ['Police'],
            maxBuildingsFunction: (): number => 1700,
        },
        7: {
            caption: 'Dispatch Center',
            color: '#24c3ae',
            coins: 0,
            credits: 0,
            extensions: [],
            levelcost: [],
            maxBuildings:
                'For every 25 buildings, you can build one control center',
            maxLevel: 0,
            special: 'The control center is the administrative center.',
            startPersonnel: 0,
            startVehicles: [],
            maxBuildingsFunction: (buildingsAmountTotal: number): number =>
                Math.floor(buildingsAmountTotal / 25) + 1,
        },
        8: {
            caption: 'Police training centre',
            color: '#225522',
            coins: 50,
            credits: 500_000,
            extensions: [
                ...new Array(3).fill({
                    caption: 'Additional classroom',
                    credits: 400_000,
                    coins: 40,
                    duration: '7 Days',
                }),
            ],
            levelcost: [],
            maxBuildings: 'No limit',
            maxLevel: 0,
            special:
                "Finance Admins and admins can (expand) association police schools with the help of credits from the association's Funds. Alliance Educators and admins can start training courses at association police schools.",
            startPersonnel: 0,
            startVehicles: [],
        },
        13: {
            caption: 'Police Aviation',
            color: '#148423',
            coins: 50,
            credits: 1_000_000,
            extensions: [],
            levelcost: ['1-5. 1.000.000 Credits / 50 Coins'],
            maxBuildings: 'see specials',
            maxLevel: 5,
            special:
                'Up to 6 landing sites can be built per station (expansion stages). Up to the 125th building (of all types) a total of max. 4 landing sites can be built. After that the number increases by 1 every 25 buildings (starting at the 125th).',
            startPersonnel: 3,
            startVehicles: [],
            schoolingTypes: ['Police'],
            maxBuildingsFunction: (buildingsAmountTotal: number): number =>
                buildingsAmountTotal < 125
                    ? 4
                    : Math.floor(buildingsAmountTotal / 25),
        },
        14: {
            caption: 'Staging area',
            coins: 0,
            credits: 0,
            extensions: [],
            levelcost: [],
            maxBuildings: 4,
            maxLevel: 0,
            special:
                'You can station as many of your own vehicles as you like at a staging area, members of the alliance can use the staging area. A staging area remains for 24 hours, but you can reset it to 24 hours at any time.With Premium Account you can have 8 staging areas at the same time',
            startPersonnel: 0,
            startVehicles: [],
            maxBuildingsFunction: (): number => 4,
        },
        16: {
            caption: 'Prison',
            coins: 'x',
            credits: 100_000,
            extensions: [
                {
                    caption: 'Prison cell',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Days',
                },
                ...new Array(9).fill({
                    caption: 'Additional cell',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Days',
                }),
            ],
            levelcost: [],
            maxBuildings: 'No limit',
            maxLevel: 0,
            special:
                "This building can only be built and developed by admins and finance ministers with credits from the association's treasury.The built Prison Cells are available to all members of the association.",
            startPersonnel: 0,
            startVehicles: [],
        },
        18: {
            caption: 'Fire station (Small station) ',
            color: '#aa1111',
            coins: 25,
            credits: 50_000,
            extensions: [
                {
                    caption: 'Ambulance extension',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Days',
                },
                {
                    caption: 'Airport extension',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Days',
                },
                {
                    caption: 'Foam Extension',
                    credits: 150_000,
                    coins: 15,
                    duration: '5 Days',
                },
                {
                    caption: 'Swap Body Parking Space',
                    credits: 50_000,
                    coins: 20,
                    duration: '7 Days',
                },
                ...new Array(1).fill({
                    caption: 'Swap Body Parking Space',
                    credits: 50_000,
                    coins: 20,
                    duration: '7 Days',
                }),
                {
                    caption: 'Water rescue expansion',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Days',
                },
            ],
            levelcost: [
                '1. 10.000',
                '2. 50.000',
                '3.-5. 100.000',
                'Conversion to normal stations: difference price to normal stations',
            ],
            maxBuildings: '6.000 together with fire stations',
            maxLevel: 5,
            special:
                'From the 24th fire station onwards, the cost of building a new fire station increases according to the following formula: <code>(50.000+100.000*LOG<sub>2</sub>(Number of existing fire stations − 22)) / 2</code>. max. 1 Million Credits. The Coins price remains constant!',
            startPersonnel: 10,
            startVehicles: ['Water Ladder', 'Light 4X4 Pump (L4P)'],
            schoolingTypes: ['Fire Station'],
            maxBuildingsFunction: (): number => 6000,
        },
        19: {
            caption: 'Police station (Small station)',
            color: '#116611',
            coins: 25,
            credits: 50_000,
            extensions: [
                {
                    caption: 'Prison cell',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Days',
                },
                ...new Array(1).fill({
                    caption: 'Additional cell',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Days',
                }),
                {
                    caption: 'Police & Public Safety Extension',
                    credits: 100_000,
                    coins: 15,
                    duration: '7 Days',
                },
            ],
            levelcost: [
                '1. 10.000',
                '2. 50.000',
                '3.-5. 100.000',
                'Conversion to normal station: difference price to normal station',
            ],
            maxBuildings: '1.700 together with police stations',
            maxLevel: 5,
            special:
                'From the 24th police station onwards, the costs for the new construction of a police station are calculated according to the following formula: <code>(50.000+100.000*LOG<sub>2</sub>(Number of existing police stations − 22)) / 2</code>. The Coins price remains constant!',
            startPersonnel: 2,
            startVehicles: ['Incident response vehicle (IRV)'],
            schoolingTypes: ['Police'],
            maxBuildingsFunction: (): number => 1700,
        },
        20: {
            caption: 'Ambulance station (Small station)',
            color: '#eeb611',
            coins: 25,
            credits: 100_000,
            extensions: [
                {
                    caption: 'Mass Casualty Extension',
                    credits: 150_000,
                    coins: 20,
                    duration: '5 Days',
                },
            ],
            levelcost: [
                '1. 10.000',
                '2. 50.000',
                '3.-5. 100.000',
                'Conversion to normal station: difference price to normal station',
            ],
            maxBuildings: 'No limit',
            maxLevel: 5,
            special: '',
            startPersonnel: 3,
            startVehicles: ['Ambulance'],
            schoolingTypes: ['Rescue'],
        },
        21: {
            caption: 'Clinic',
            color: '#e2e53b',
            coins: 25,
            credits: 100_000,
            extensions: [
                {
                    caption: 'General Internal',
                    credits: 10_000,
                    coins: 10,
                    duration: '7 Days',
                },
            ],
            levelcost: ['1-5. 20.000'],
            maxBuildings: 'No limit',
            maxLevel: 5,
            special: '',
            startPersonnel: 0,
            startVehicles: ['None. You can buy a max of 2 Vehicles'],
            schoolingTypes: ['Rescue'],
        },
        22: {
            caption: 'Home Response Location',
            color: '#eeb611',
            coins: 10,
            credits: 10_000,
            extensions: [],
            levelcost: ['not expandable'],
            maxBuildings: 'No limit',
            maxLevel: 0,
            special:
                'It can only Store: Fire Officer, Rapid Response Vehicle, Operational Team Leader, General Practitioner, Community First Responder, Ambulance Officer and the Dog Support Unit (DSU)',
            startPersonnel: 1,
            startVehicles: [''],
            schoolingTypes: ['Rescue', 'Police', 'Fire'],
        },
        23: {
            caption: 'Large complex',
            color: '#8B4513',
            coins: 'Too Expensive',
            credits: 'Too Expensive',
            extensions: [],
            levelcost: ['Too Expensive'],
            maxBuildings: 'No Limit',
            maxLevel: 5,
            special: "TOO EXPENSIVE, DON'T BUY IT, DON'T EXPAND IT",
            startPersonnel: 'there is none',
            startVehicles: [''],
        },
        24: {
            caption: 'Small complex',
            color: '#8B4513',
            coins: 'Too Expensive',
            credits: 'Too Expensive',
            extensions: [],
            levelcost: ['Too Expensive'],
            maxBuildings: 'No Limit',
            maxLevel: 5,
            special: "TOO EXPENSIVE, DON'T BUY IT, DON'T EXPAND IT",
            startPersonnel: 'there is none',
            startVehicles: [''],
        },
        25: {
            caption: 'HART Base',
            color: '#eeb611',
            coins: 25,
            credits: 400_000,
            extensions: [
                {
                    caption: 'Mass Casualty Extension',
                    credits: 150_000,
                    coins: 20,
                    duration: '5 Days',
                },
            ],
            levelcost: [
                '1. 10.000',
                '2. 25.000',
                '3. 50.000',
                '4.-9. 100.000',
                '10.-14. 150.000',
                '15.-20. 200.000',
            ],
            maxBuildings: 'No limit',
            maxLevel: 20,
            special: '',
            startPersonnel: 10,
            startVehicles: [],
            schoolingTypes: ['Rescue'],
        },
        26: {
            caption: 'Large Police Depot',
            color: '#116611',
            coins: 50,
            credits: 1_000_000,
            extensions: [
                {
                    caption: 'Prison cell',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Days',
                },
                ...new Array(39).fill({
                    caption: 'Additional cell',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Days',
                }),
                {
                    caption: 'Police & Public Safety Extension',
                    credits: 100_000,
                    coins: 15,
                    duration: '7 Days',
                },
                {
                    caption: 'Additional Detention Van Parking Spaces',
                    credits: 100_000,
                    coins: 15,
                    duration: '5 Days',
                },
            ],
            levelcost: [
                '1. 20.000',
                '2. 50.000',
                '3. 100.000',
                '4. 150.000',
                '5.-9. 200.000',
                '10.-14. 300.000',
                '15.-20. 400.000',
            ],
            maxBuildings: 'no limit',
            maxLevel: 20,
            special: 'You Can build every 50 Police Stations',
            startPersonnel: 20,
            startVehicles: [],
            schoolingTypes: ['Police'],
        },
    },
    buildingCategories: {
        'Fire Department': {
            buildings: [0, 1, 18],
            color: '#ff2d2d',
        },
        'Ambulance Stations': {
            buildings: [2, 3, 5, 20, 21, 25],
            color: '#ffa500',
        },
        'Police Stations': {
            buildings: [6, 8, 13, 19, 26],
            color: '#00ac00',
        },
        'Other': {
            buildings: [7, 4, 14, 22, 23, 24],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        'Fire Fighting Vehicles': {
            vehicles: {
                'Pumps': [0, 1, 16, 26, 17],
                'Special Vehicles': [4, 7, 14, 18, 6, 2, 39],
                'Command Vehicles': [15, 3],
                'Pods and Prime Movers': [
                    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                ],
                'Foam Vehicles': [35, 36, 37, 38],
            },
            color: '#ff2d2d',
        },
        'Ambulance Vehicles': {
            vehicles: {
                'Ambulances': [5],
                'HEMS': [9],
                'Rapid Response Vehicles': [10, 19, 20, 21, 22],
                'HART Units': [23, 27, 28, 29, 30, 31, 32, 33, 34],
            },
            color: '#ffa500',
        },
        'Police Vehicles': {
            vehicles: {
                'Police Car': [8],
                'ARV': [13, 56],
                'Police Helicopter': [11],
                'DSU': [12],
                'Traffic Cars': [24, 25],
                'PSU': [51, 52, 53, 54, 55],
            },
            color: '#00ac00',
        },
    },
    small_buildings: {
        0: 18,
        2: 20,
        6: 19,
    },
    vehicleBuildings: [0, 2, 5, 6, 13, 14, 18, 19, 20, 21, 22, 25, 26],
    cellBuildings: [6, 19, 26],
    cellExtensions: [
        '6_0',
        '6_1',
        '6_2',
        '6_3',
        '6_4',
        '6_5',
        '6_6',
        '6_7',
        '6_8',
        '6_9',
        '19_1',
        '19_2',
    ],
    bedBuildings: [4, 21],
    schoolBuildings: [1, 3, 8],
    dispatchCenterBuildings: [7],
    schoolings: {
        'Fire Station': [
            {
                caption: 'HazMat',
                duration: '3 Days',
                staffList: 'HazMat Unit',
            },
            {
                caption: 'Mobile command',
                duration: '5 Days',
                staffList: 'Level 1 Incident Commander Training',
            },
            {
                caption: 'ARFF-Training',
                duration: '3 Days',
            },
            {
                caption: 'Swift water rescue',
                duration: '4 Days',
            },
            {
                caption: 'Ocean Navigation',
                duration: '5 Days',
            },
            {
                caption: 'Co-Responder Training',
                duration: '3 Days',
                staffList: 'Co-Responder',
            },
            {
                caption: 'High Volume Pump Training',
                duration: '3 Days',
                staffList: 'High Volume Pump Training',
            },
        ],
        'Police': [
            {
                caption: 'Police aviation',
                duration: '7 Days',
                staffList: 'Police aviation',
            },
            {
                caption: 'Firearms training',
                duration: '5 Days',
                staffList: 'Firearms training',
            },
            {
                caption: 'Dog handling',
                duration: '5 Days',
                staffList: 'Dog handling',
            },
            {
                caption: 'Roads Policing Officer Training',
                duration: '3 Days',
                staffList: 'Roads Policing Officer',
            },
            {
                caption: 'Level 1 Public Order Training',
                duration: '5 Days',
                staffList: 'Level 1 Public Order Officer',
            },
            {
                caption: 'Level 2 Public Order Training',
                duration: '5 Days',
                staffList: 'Level 2 Public Order Officer',
            },
            {
                caption: 'Police Medic Training',
                duration: '4 Days',
                staffList: 'Police Medic',
            },
            {
                caption: 'Police Sergeant Training',
                duration: '4 Days',
                staffList: 'Police Sergeant',
            },
            {
                caption: 'Police Inspector Training',
                duration: '4 Days',
                staffList: 'Police Inspector',
            },
            {
                caption: 'Mounted Training',
                duration: '4 Days',
                staffList: 'Mounted Officers',
            },
        ],
        'Rescue': [
            {
                caption: 'Critical care',
                duration: '5 Days',
                staffList: 'Critical care',
            },
            {
                caption: 'HART Training',
                duration: '5 Days',
                staffList: 'HART Training',
            },
            {
                caption: 'Tactical Command Course',
                duration: '5 Days',
                staffList: 'Tactical Command Course',
            },
            {
                caption: 'SORT Training',
                duration: '3 Days',
                staffList: 'SORT',
            },
            {
                caption: 'Ambulance Officer',
                duration: '5 Days',
                staffList: 'Ambulance Officer',
            },
        ],
    },
    amount: 'Quantity',
    search: 'Search',
    mapSearch: 'Location search',
    alliance: 'Alliance',
    premiumNotice:
        'This feature extends a premium feature of the game and is therefore only available for players with a Missionchief game premium account!',
    credits: 'Credits',
    coins: 'Coins',
    close: 'Close',
    fullscreen: {
        expand: 'Activate full screen mode',
        compress: 'Disable full screen mode',
    },
    hideTitle: 'Show heading | Hide heading',
    vehicle: 'Cars | Car | Cars',
    building: 'Buildings',
    station: 'Stations | Station | Stations',
    distance: 'Distance | Distances',
    vehicleType: 'Vehicle type',
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
    buildingIcons: [
        'fire',
        'rss',
        'hospital',
        'clinic-medical',
        'graduation-cap',
        'shield-alt',
        'helicopter',
        'graduation-cap',
        'helicopter',
        'building',
        '',
        'ship',
        'ship',
        'fire',
        'stethoscope',
        'shield-alt',
        'clinic-medical',
        'plane',
        'shield-alt',
    ],
    pois: [
        'Park',
        'Lake',
        'Hospital',
        'Forest',
        'Bus stop',
        'Tram stop',
        'Train station (regional traffic)',
        'Train station (regional traffic and long-distance travel)',
        'Goods station',
        'Supermarket (small)',
        'Supermarket (big)',
        'Petrol Station',
        'School',
        'Museum',
        'Mall',
        'Car workshop',
        'Highway exit',
        'Christmas market',
        'Storehouse',
        'Nightclub',
        'Stadium',
        'Farm',
        'Office Building',
        'Swimming bath',
        'Railroad Crossing',
        'Theater',
        'Fairground',
        'River',
        'Small Airport (Runway)',
        'Large Airport (Runway)',
        'Airport Terminal',
        'Bank',
        'Warehouse',
        'Bridge',
        'Fast Food Restaurant',
        'Cargo port',
        'Recycling Centre',
        'High Rise',
        'Cruise ship dock',
        'Marina',
        'Rail Crossing',
        'Tunnel',
        'Cold Storage Warehouse',
        'Power Plant',
        'Factory',
        'Scrap yard',
        'Subway station',
        'Small chemical storage tank',
        'Large chemical storage tank',
        'Hotel',
        'Bar',
        'Landfill site',
        'Parking Garage',
        'Silo',
        'Heathland',
        'Intersection with lights',
        'High Rise with Cladding',
        'Major Road Standby Point',
        'Nuclear power station',
        'Munition dump',
        'Restaurant',
        'Market place',
        'Dirt Race Track',
        'Sheltered housing scheme',
        'University',
        'Golf course',
        'Moorland',
        'Theme Park',
        'Abandoned Building',
        'Festival',
        'Allotment',
        'Container Holding Area',
        'Small Fuel Storage Tank',
        'Large Fuel Storage Tank',
        'Fuel Storage Depot',
        'Multi-Storey Car Park',
    ],
    only_alliance_missions: [57, 74, 89],
    transfer_missions: [77],
    ranks: {
        missionchief: {
            0: 'Probie',
            200: 'Firefighter',
            10_000: 'Senior Firefighter',
            100_000: 'Fire Apparatus Operator',
            1_000_000: 'Lieutenant',
            5_000_000: 'Captain',
            20_000_000: 'Staff Captain',
            50_000_000: 'Battalion Chief',
            1_000_000_000: 'Division Chief',
            2_000_000_000: 'Deputy Chief',
            5_000_000_000: 'Fire Chief',
        },
        policechief: {
            0: 'Police Community Support Officer',
            200: 'Police Constable',
            10_000: 'Sergeant',
            100_000: 'Inspector',
            1_000_000: 'Chief Inspector',
            5_000_000: 'Superintendent',
            20_000_000: 'Chief Superintendent',
            50_000_000: 'Commander',
            1_000_000_000: 'Assistant Chief Constable',
            2_000_000_000: 'Deputy Chief Constable',
            5_000_000_000: 'Chief Constable',
        },
    },
};
