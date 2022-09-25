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
    serverUmzugWarning: `Server maintenance on Thursday, 15.09.2022 from 14h (Local time: {local}). The LSSM and scripts using the LSSM API will be unavailable for a few hours!`,
    updateUserscript: {
        title: 'Userscript out of date',
        text: `Dear LSSM-User,<br>
unfortunately your LSSM V.4 userscript is outdated. In the latest version changes have been made to the userscript, which are important for the function of the LSSM V.4.<br>
You need at least version {minVersion}, the update can be done comfortably by clicking on {updateLink}.<br>
Sometimes the update does not work by clicking the link (for unknown reasons). Then you can either trigger an update within Tampermonkey (click on the tampermonkey icon in your browser, then "Overview". Check the box in front of the LSSM userscript and select "Update" as action.<br>
If that also does not work, edit the LSSM Script within Tampermonkey by replacing all script content with the content of {bypassLink}.<br>
Sometimes, LSSM is installed multiple times after an update. In this case, please delete the script that does not have version 4.5.10 (in Tampermonkey).<br>
We're sorry for any caused issue if updates did not work correctly.
<br>
Kind regards,<br>
your LSSM team`,
        close: 'Ok',
    },
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
        debugMode: {
            title: 'Debug-Mode',
            description:
                'A small debug mode that displays helpful hints in the browser console. Enabling it is only recommended if requested by the LSSM team, as the console will contain many messages.',
        },
    },
    vehicles: {
        0: {
            caption: 'Type 1 fire engine',
            color: '#cc0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 6,
            wtank: 750,
            ftank: 25,
            possibleBuildings: [0, 13],
        },
        1: {
            caption: 'Type 2 fire engine',
            color: '#bb0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 3,
            wtank: 500,
            ftank: 25,
            possibleBuildings: [0, 13],
        },
        2: {
            caption: 'Platform truck',
            color: '#d92626',
            coins: 30,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 13],
            special: 'Required once you have built 3 firehouses',
        },
        3: {
            caption: 'Battalion chief unit',
            color: '#d02525',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 13],
            special: 'Required once you have built 6 firehouses',
        },
        4: {
            caption: 'Heavy rescue vehicle',
            color: '#ad1f1f',
            coins: 25,
            credits: 12_180,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [0, 13],
            special: 'Required once you have built 4 firehouses',
        },
        5: {
            caption: 'ALS Ambulance',
            color: '#9c6d1c',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 3, 14, 16],
        },
        6: {
            caption: 'Mobile air',
            color: '#aa0000',
            coins: 25,
            credits: 11_860,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 13],
            special: 'Required once you have built 5 firehouses',
        },
        7: {
            caption: 'Water Tanker',
            color: '#990000',
            coins: 25,
            credits: 17_300,
            minPersonnel: 1,
            maxPersonnel: 3,
            wtank: 3000,
            possibleBuildings: [0, 13],
            special: 'Required once you have built 7 firehouses',
        },
        8: {
            caption: 'Utility unit',
            color: '#880000',
            coins: 25,
            credits: 12_180,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [0, 11, 12, 13],
            special: 'Required once you have built 4 firehouses',
        },
        9: {
            caption: 'HazMat',
            color: '#770000',
            coins: 25,
            credits: 19_200,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 13],
            schooling: {
                'Fire Station': {
                    HazMat: {
                        all: true,
                    },
                },
            },
            special: 'Required once you have built 11 firehouses',
        },
        10: {
            caption: 'Patrol Car',
            color: '#488b18',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [5, 15],
        },
        11: {
            caption: 'HEMS',
            color: '#e68319',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [6],
        },
        12: {
            caption: 'Mobile command vehicle',
            color: '#791515',
            coins: 25,
            credits: 25_500,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 13],
            schooling: {
                'Fire Station': {
                    'Mobile command': {
                        all: true,
                    },
                },
            },
            special: 'Required once you have built 13 firehouses',
        },
        13: {
            caption: 'Quint',
            color: '#dc1818',
            coins: 25,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            wtank: 500,
            ftank: 25,
            possibleBuildings: [0, 13],
            special:
                'To purchase with credits it requires the rank: Captain, <br>Lower ranked members can purchase the vehicle for 25 Coins. <br>Quint acts as a Platform Truck and a Fire Truck.',
        },
        14: {
            caption: 'Police helicopter',
            color: '#70ca16',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [8],
            schooling: {
                Police: {
                    'Police Aviation': {
                        all: true,
                    },
                },
            },
        },
        15: {
            caption: 'Fly-Car',
            color: '#b88f14',
            coins: 20,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 3, 12, 14, 16],
        },
        16: {
            caption: 'SWAT Armoured Vehicle',
            color: '#68a512',
            coins: 25,
            credits: 10_000,
            minPersonnel: 6,
            maxPersonnel: 6,
            possibleBuildings: [5, 15],
            schooling: {
                Police: {
                    SWAT: {
                        all: true,
                    },
                },
            },
            special: 'Required once you have built 8 police stations',
        },
        17: {
            caption: 'ARFF Crash Tender',
            color: '#cc2222',
            coins: 25,
            credits: 20_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            wtank: 4500,
            ftank: 650,
            possibleBuildings: [0],
            schooling: {
                'Fire Station': {
                    'ARFF-Training': {
                        all: true,
                    },
                },
            },
        },
        18: {
            caption: 'Rescue Engine',
            color: '#bb2222',
            coins: 25,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            wtank: 750,
            ftank: 25,
            possibleBuildings: [0, 13],
            special:
                'To purchase with credits it requires the rank: Captain, <br>Lower ranked members can purchase the vehicle for 25 Coins.<br> The Rescue Engine acts as a Heavy Rescue and a Fire Engine.',
        },
        19: {
            caption: 'K-9 Unit',
            color: '#30aa22',
            coins: 25,
            credits: 7000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [5, 15],
            schooling: {
                Police: {
                    'K-9': {
                        all: true,
                    },
                },
            },
            special: 'Required from 6 Police stations',
        },
        20: {
            caption: 'Mass Casualty Unit',
            color: '#996d22',
            coins: 25,
            credits: 25_000,
            minPersonnel: 6,
            maxPersonnel: 6,
            possibleBuildings: [0, 3, 16],
            special:
                'Then 7 patients can be treated and removed simultaneously in the MCU.You can buy 1 Mass Casualty Vehicle for every 20 ambulance stations (respectively 15 with premium account).',
        },
        21: {
            caption: 'Heavy Rescue + Light Boat',
            color: '#882222',
            coins: 25,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 5,
            possibleBuildings: [0],
            schooling: {
                'Fire Station': {
                    'Swift water rescue': {
                        all: true,
                    },
                },
            },
            special:
                'Combines the Heavy Rescue Vehicle/Utility Vehicle with an integrated boat.<br> No need for a boat trailer.',
        },
        22: {
            caption: 'Light Boat Trailer',
            color: '#772222',
            coins: 12,
            credits: 6000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0, 11, 12],
            special:
                'Accessory boat that can be towed with the Utility Unit. Requires Swift Water Rescue trained personnel to operate.<br> The boat trailer cannot be assigned personnel, <br>either assign your trained personnel to the towing vehicle, or assign them to a separate unit en route.',
        },
        23: {
            caption: 'Police Motorcycle',
            color: '#638a2a',
            coins: 18,
            credits: 2500,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [5, 15],
            schooling: {
                Police: {
                    'Police Motorcycle': {
                        all: true,
                    },
                },
            },
        },
        24: {
            caption: 'Large Fireboat',
            color: '#552222',
            coins: 35,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 7,
            possibleBuildings: [11],
            schooling: {
                'Fire Station': {
                    'Ocean Navigation': {
                        all: true,
                    },
                },
            },
        },
        25: {
            caption: 'Large Rescue Boat',
            color: '#92702e',
            coins: 35,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 6,
            possibleBuildings: [12],
            schooling: {
                'Fire Station': {
                    'Ocean Navigation': {
                        all: true,
                    },
                },
            },
        },
        26: {
            caption: 'SWAT SUV',
            color: '#415a30',
            coins: 23,
            credits: 7000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [5, 15],
            schooling: {
                Police: {
                    SWAT: {
                        all: true,
                    },
                },
            },
            special: 'Required once you have built 8 police stations',
        },
        27: {
            caption: 'BLS Ambulance',
            color: '#a4752e',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 3, 14, 16],
        },
        28: {
            caption: 'EMS Rescue',
            color: '#f59f00',
            coins: 25,
            credits: 12_180,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 3, 14, 16],
            special:
                'No missions require a EMS Rescue at this time, however it is able to treat patients. And Works as a Heavy Rescue',
        },
        29: {
            caption: 'EMS Chief',
            color: '#e09200',
            coins: 20,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 3, 14, 16],
            special: 'Required once you have built 10 Rescue stations',
        },
        30: {
            caption: 'Type 3 engine',
            color: '#440000',
            coins: 19,
            credits: 19_000,
            minPersonnel: 3,
            maxPersonnel: 5,
            wtank: 500,
            ftank: 20,
            possibleBuildings: [0],
        },
        31: {
            caption: 'Type 5 engine',
            color: '#b01d2f',
            coins: 8,
            credits: 8000,
            minPersonnel: 1,
            maxPersonnel: 3,
            wtank: 400,
            possibleBuildings: [0],
        },
        32: {
            caption: 'Type 7 engine',
            color: '#a01717',
            coins: 5,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            wtank: 50,
            possibleBuildings: [0],
        },
        33: {
            caption: 'Pumper Tanker',
            color: '#570f0f',
            coins: 19,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            wtank: 2500,
            ftank: 25,
            possibleBuildings: [0, 13],
        },
        34: {
            caption: 'Crew Carrier',
            color: '#bf2222',
            coins: 10,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 12,
            possibleBuildings: [0, 13],
        },
        35: {
            caption: 'Water drop helicopter',
            color: '#800e20',
            coins: 130,
            credits: 300_000,
            minPersonnel: 2,
            maxPersonnel: 5,
            wtank: 2000,
            possibleBuildings: [17],
            schooling: {
                'Fire Station': {
                    'Airborne firefighting': {
                        all: true,
                    },
                },
            },
        },
        36: {
            caption: 'Air Tanker',
            color: '#450c0c',
            coins: 50,
            credits: 1_000_000,
            minPersonnel: 2,
            maxPersonnel: 5,
            wtank: 7200,
            possibleBuildings: [17],
            schooling: {
                'Fire Station': {
                    'Airborne firefighting': {
                        all: true,
                    },
                },
            },
        },
        37: {
            caption: 'Heavy air tanker',
            color: '#5f0606',
            coins: 65,
            credits: 1_500_000,
            minPersonnel: 2,
            maxPersonnel: 5,
            wtank: 12_000,
            possibleBuildings: [17],
            schooling: {
                'Fire Station': {
                    'Airborne firefighting': {
                        all: true,
                    },
                },
            },
        },
        38: {
            caption: 'Type 4 engine',
            color: '#9f0d13',
            coins: 10,
            credits: 10_000,
            minPersonnel: 3,
            maxPersonnel: 5,
            possibleBuildings: [0],
            wtank: 750,
        },
        39: {
            caption: 'Type 6 engine',
            color: '#a70e0e',
            coins: 5,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0],
            wtank: 150,
        },
        40: {
            caption: 'Dozer Trailer',
            color: '#a30021',
            coins: 15,
            credits: 20_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0],
            schooling: {
                'Fire Station': {
                    'Heavy Machinery Operating': {
                        all: true,
                    },
                },
            },
            special:
                "Dozer Trailer that can be towed with the Crew cap semi. Requires Heavy Machinery Operating and Truck Driver's License trained personnel to operate.<br> The dozer trailer cannot be assigned personnel, <br>either assign your trained personnel to the towing vehicle, or assign them to a separate unit en route.",
        },
        41: {
            caption: 'Crew cap semi',
            color: '#9f1616',
            coins: 12,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 3, 13],
            schooling: {
                'Fire Station': {
                    "Truck Driver's License": {
                        all: true,
                    },
                },
                'Rescue': {
                    "Truck Driver's License": {
                        all: true,
                    },
                },
            },
        },
        42: {
            caption: 'FBI Unit',
            color: '#001bcc',
            coins: 15,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [18],
        },
        43: {
            caption: 'FBI Investigation Wagon',
            color: '#001ee0',
            coins: 15,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [18],
        },
        44: {
            caption: 'FBI Mobile Command Center',
            color: '#0021f5',
            coins: 25,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [18],
            schooling: {
                Police: {
                    'FBI Mobile Center Commander': {
                        all: true,
                    },
                },
            },
        },
        45: {
            caption: 'FBI Bomb Technician Vehicle',
            color: '#0a2bff',
            coins: 35,
            credits: 35_500,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [18],
            schooling: {
                Police: {
                    'FBI Bomb Technician': {
                        all: true,
                    },
                },
            },
        },
        46: {
            caption: 'FBI Surveillance Drone',
            color: '#4282f0',
            coins: 25,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [18],
            schooling: {
                Police: {
                    'FBI Drone Operator': {
                        all: true,
                    },
                },
            },
        },
        47: {
            caption: 'Sheriff Unit',
            color: '#58ad0e',
            coins: 20,
            credits: 15_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [5, 15],
            schooling: {
                Police: {
                    Sheriff: {
                        all: true,
                    },
                },
            },
        },
        48: {
            caption: 'EMS Fire Engine/Ambulance',
            color: '#cb9240',
            coins: 30,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 3, 14, 16],
            schooling: {
                'Fire Station': {
                    'ALS Medical Training for Fire Apparatus': {
                        all: true,
                    },
                },
                'Rescue': {
                    'ALS Medical Training for Fire Apparatus': {
                        all: true,
                    },
                },
            },
            special: 'Works as Fire Engine and Ambulance',
        },
        49: {
            caption: 'Tactical Ambulance',
            color: '#a7741e',
            coins: 30,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 3, 14, 16],
            schooling: {
                'Fire Station': {
                    'Tactical Medic Training': {
                        all: true,
                    },
                },
                'Rescue': {
                    'Tactical Medic Training': {
                        all: true,
                    },
                },
            },
            special: 'Works as Police Car and Ambulance',
        },
        50: {
            caption: 'Hazmat Ambulance',
            color: '#bc893d',
            coins: 35,
            credits: 30_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 3, 14, 16],
            schooling: {
                'Fire Station': {
                    Hazmat: {
                        all: true,
                    },
                },
                'Rescue': {
                    'Hazmat Medic Training': {
                        all: true,
                    },
                },
            },
            special:
                'Required once you have built 11 firehouses, works as HazMat and Ambulance',
        },
        51: {
            caption: 'DEA Unit',
            color: '#4282f0',
            coins: 15,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [18],
        },
        52: {
            caption: 'DEA Clan Lab',
            color: '#4282f0',
            coins: 20,
            credits: 15_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [18],
        },
        53: {
            caption: 'ATF Unit',
            color: '#4282f0',
            coins: 15,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [18],
        },
        54: {
            caption: 'ATF Lab Vehicle',
            color: '#4282f0',
            coins: 20,
            credits: 15_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [18],
        },
        55: {
            caption: 'Patrol Boat',
            color: '#4282f0',
            coins: 30,
            credits: 30_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [5],
            schooling: {
                Police: {
                    'Ocean Navigation': {
                        all: true,
                    },
                },
            },
        },
        56: {
            caption: "Warden's Truck",
            color: '#4282f0',
            coins: 15,
            credits: 20_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [5],
            schooling: {
                Police: {
                    'Environmental Game Warden': {
                        all: true,
                    },
                },
            },
        },
        57: {
            caption: 'EMS Mass Casualty Trailer (large)',
            color: '#bc893d',
            coins: 30,
            credits: 30_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [3],
            special:
                'Needed towing vehicle (Crew cab semi). Works like the Mass Casualty Unit but without transport.',
        },
        58: {
            caption: 'EMS Mass Casualty Trailer (small)',
            color: '#bc893d',
            coins: 15,
            credits: 15_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [3],
            special:
                'Needed towing vehicle (Fly-Car, EMS Rescue, EMS Chief). Works like the Mass Casualty Unit but without transport.',
        },
        59: {
            caption: 'EMS Operations Support',
            color: '#bc893d',
            coins: 20,
            credits: 25_000,
            minPersonnel: 3,
            maxPersonnel: 3,
            possibleBuildings: [0, 3, 14, 16],
            special:
                'You can buy 1 EMS Operations Support Unit for every 20 ambulance stations (respectively 15 with premium account).',
        },
        60: {
            caption: 'EMS Mobile Command Unit',
            color: '#bc893d',
            coins: 35,
            credits: 40_000,
            minPersonnel: 6,
            maxPersonnel: 6,
            possibleBuildings: [0, 3, 14, 16],
            schooling: {
                'Fire Station': {
                    'EMS Mobile Command': {
                        all: true,
                    },
                },
                'Rescue': {
                    'EMS Mobile Command': {
                        all: true,
                    },
                },
            },
        },
        61: {
            caption: 'ALS Rescue Ambulance',
            color: '#bc893d',
            coins: 30,
            credits: 25_000,
            minPersonnel: 3,
            maxPersonnel: 3,
            possibleBuildings: [0, 3, 14, 16],
            special:
                'To purchase with credits it requires the rank: Captain, <br>Lower ranked members can purchase the vehicle for 30 Coins.<br>Works as Heavy Rescue and Ambulance',
        },
        62: {
            caption: 'Fire Investigator Unit',
            color: '#9f1616',
            coins: 15,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 22],
            schooling: {
                'Fire Station': {
                    'Law Enforcement for Arson Investigation': {
                        all: true,
                    },
                },
            },
        },
        63: {
            caption: 'Fire Prevention Unit',
            color: '#9f1616',
            coins: 15,
            credits: 15_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 22],
        },
        64: {
            caption: 'Foam Tender',
            color: '#9f1616',
            coins: 15,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            possibleBuildings: [0],
            ftank: 6500,
        },
        65: {
            caption: 'Foam Trailer',
            color: '#9f1616',
            coins: 10,
            credits: 10_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            ftank: 650,
            possibleBuildings: [0],
            special:
                'Needed towing vehicle (Utility unit, Type 6 engine, Battalion chief unit, mcv)',
        },
        66: {
            caption: 'Lifeguard Truck',
            color: '#882222',
            coins: 10,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [0, 13, 23, 26],
            special: '',
        },
        67: {
            caption: 'Lifeguard Rescue',
            color: '#882222',
            coins: 15,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [0, 13, 23, 26],
            schooling: {
                'Water Rescue School': {
                    'Lifeguard Training': {
                        all: true,
                    },
                },
                'Fire Station': {
                    'Lifeguard Training': {
                        all: true,
                    },
                },
            },
            special: '',
        },
        68: {
            caption: 'Lifeguard Supervisor',
            color: '#882222',
            coins: 10,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 13, 23, 26],
            schooling: {
                'Water Rescue School': {
                    'Lifeguard Supervisor': {
                        all: true,
                    },
                },
                'Fire Station': {
                    'Lifeguard Supervisor': {
                        all: true,
                    },
                },
            },
            special: '',
        },
        69: {
            caption: 'Small Coastal Boat',
            color: '#882222',
            coins: 15,
            credits: 50_000,
            minPersonnel: 2,
            maxPersonnel: 6,
            possibleBuildings: [23],
            special: '',
        },
        70: {
            caption: 'Large Coastal Boat',
            color: '#882222',
            coins: 25,
            credits: 75_000,
            minPersonnel: 2,
            maxPersonnel: 6,
            possibleBuildings: [23],
            schooling: {
                'Water Rescue School': {
                    'Ocean Navigation': {
                        all: true,
                    },
                },
            },
            special: '',
        },
        71: {
            caption: 'Coastal Helicopter',
            color: '#882222',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [25],
            schooling: {
                'Water Rescue School': {
                    'Coastal Air Rescue Operations': {
                        all: true,
                    },
                },
            },
            special: '',
        },
        72: {
            caption: 'Coastal Guard Plane',
            color: '#882222',
            coins: 30,
            credits: 500_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [25],
            schooling: {
                'Water Rescue School': {
                    'Coastal Air Rescue Operations': {
                        all: true,
                    },
                },
            },
            special: '',
        },
        73: {
            caption: 'Small Coastal Boat Trailer',
            color: '#882222',
            coins: 15,
            credits: 50_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0, 13, 26],
            schooling: {
                'Water Rescue School': {
                    'Swift water rescue': {
                        all: true,
                    },
                },
                'Fire Station': {
                    'Swift water rescue': {
                        all: true,
                    },
                },
            },
            special: '',
        },
    },
    buildingCategories: {
        'Fire Department': {
            buildings: [0, 4, 11, 13, 17, 22],
            color: '#ff2d2d',
        },
        'Rescue Stations': {
            buildings: [3, 6, 12, 16, 19],
            color: '#ffa500',
        },
        'Police Stations': {
            buildings: [5, 7, 8, 15, 18],
            color: '#00ac00',
        },
        'Lifeguard Stations': {
            buildings: [23, 25, 26],
            color: '#00ac00',
        },
        'Other': {
            buildings: [1, 2, 9, 14, 20, 21, 24],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        'Firefighters': {
            vehicles: {
                'Fire trucks': [0, 1, 13, 18],
                'WaterTanker': [7],
                'Special vehicles': [2, 3, 4, 6, 8, 9, 12, 62, 63, 64, 65],
                'Wildland vehicles': [30, 31, 32, 33, 34, 38, 39, 40, 41],
                'Airport Vehicles': [17],
                'Boats': [21, 22, 24],
                'Fire Aviation': [35, 36, 37],
            },
            color: '#ff2d2d',
        },
        'Rescue Vehicles': {
            vehicles: {
                'Ambulances': [5, 27, 48, 49, 50, 57, 58, 61],
                'HEMS': [11],
                'First Responder': [15],
                'Rescue Boat': [25],
                'Other EMS Vehicle': [20, 28, 29, 59, 60],
            },
            color: '#ffa500',
        },
        'Police Vehicles': {
            vehicles: {
                'Patrol Car': [10],
                'SWAT': [16, 26],
                'Police Motorcycle': [23],
                'Police helicopter': [14],
                'K-9 Unit': [19],
                'FBI': [42, 43, 44, 45, 46],
                'DEA': [51, 52],
                'ATF': [53, 54],
                'Boat': [55],
                'Game Warden': [56],
                'Sheriff': [47],
            },
            color: '#00ac00',
        },
        'Lifeguard Vehicles': {
            vehicles: {
                'Cars': [66, 67, 68],
                'Boats': [69, 70, 73],
                'Helicopter and Planes': [71, 72],
            },
            color: '#58b658',
        },
    },
    small_buildings: {
        0: 13,
        3: 16,
        5: 15,
    },
    schoolings: {
        'Fire Station': [
            {
                caption: 'HazMat',
                duration: '3 Days',
                staffList: 'HazMat',
            },
            {
                caption: 'Mobile command',
                duration: '5 Days',
                staffList: 'Mobile Command',
            },
            {
                caption: 'ARFF-Training',
                duration: '3 Days',
                staffList: 'ARFF',
            },
            {
                caption: 'Swift water rescue',
                duration: '4 Days',
                staffList: 'Swift water rescue',
            },
            {
                caption: 'Ocean Navigation',
                duration: '5 Days',
                staffList: 'Ocean Navigation',
            },
            {
                caption: 'Airborne firefighting',
                duration: '5 Days',
                staffList: 'Airborne firefighting',
            },
            {
                caption: 'Heavy Machinery Operating',
                duration: '3 Days',
                staffList: 'Heavy Machinery Operating',
            },
            {
                caption: "Truck Driver's License",
                duration: '2 Days',
                staffList: "Truck Driver's License",
            },
            {
                caption: 'ALS Medical Training for Fire Apparatus',
                duration: '3 Days',
                staffList: 'ALS Medical Training for Fire Apparatus',
            },
            {
                caption: 'Tactical Medic Training',
                duration: '4 Days',
                staffList: 'Tactical Medic Training',
            },
            {
                caption: 'EMS Mobile Command',
                duration: '7 Days',
                staffList: 'EMS Mobile Command',
            },
            {
                caption: 'Law Enforcement for Arson Investigation',
                duration: '4 Days',
                staffList: 'Peace Officer',
            },
            {
                caption: 'Lifeguard Supervisor',
                duration: '5 Days',
                staffList: 'Lifeguard Supervisor',
            },
            {
                caption: 'Lifeguard Training',
                duration: '5 Days',
                staffList: 'Lifeguard Training',
            },
        ],
        'Police': [
            {
                caption: 'Police Aviation',
                duration: '7 Days',
                staffList: 'Police Aviation',
            },
            {
                caption: 'SWAT',
                duration: '5 Days',
                staffList: 'SWAT',
            },
            {
                caption: 'K-9',
                duration: '5 Days',
                staffList: 'K-9',
            },
            {
                caption: 'Police Motorcycle',
                duration: '3 Days',
                staffList: 'Motor Officer',
            },
            {
                caption: 'FBI Mobile Center Commander',
                duration: '7 Days',
                staffList: 'FBI Mobile Center Commander',
            },
            {
                caption: 'FBI Bomb Technician',
                duration: '5 Days',
                staffList: 'FBI Bomb Technician',
            },
            {
                caption: 'FBI Drone Operator',
                duration: '5 Days',
                staffList: 'FBI Drone Operator',
            },
            {
                caption: 'Sheriff',
                duration: '5 Days',
                staffList: 'Sheriff',
            },
            {
                caption: 'Environmental Game Warden',
                duration: '4 Days',
                staffList: 'Environmental Game Warden',
            },
            {
                caption: 'Ocean Navigation',
                duration: '5 Days',
                staffList: 'Ocean Navigation',
            },
        ],
        'Rescue': [
            {
                caption: 'ALS Medical Training for Fire Apparatus',
                duration: '3 Days',
                staffList: 'ALS Medical Training for Fire Apparatus',
            },
            {
                caption: 'Tactical Medic Training',
                duration: '4 Days',
                staffList: 'Tactical Medic Training',
            },
            {
                caption: 'Hazmat Medic Training',
                duration: '3 Days',
                staffList: 'HazMat',
            },
            {
                caption: 'EMS Mobile Command',
                duration: '7 Days',
                staffList: 'EMS Mobile Command',
            },
            {
                caption: "Truck Driver's License",
                duration: '2 Days',
                staffList: "Truck Driver's License",
            },
        ],
        'Water Rescue School': [
            {
                caption: 'Coastal Air Rescue Operations',
                duration: '5 Days',
                staffList: 'Coastal Air Rescue Operations',
            },
            {
                caption: 'Lifeguard Supervisor',
                duration: '5 Days',
                staffList: 'Lifeguard Supervisor',
            },
            {
                caption: 'Lifeguard Training',
                duration: '5 Days',
                staffList: 'Lifeguard Training',
            },
            {
                caption: 'TACLET',
                duration: '3 Days',
                staffList: 'TACLET',
            },
            {
                caption: 'Ocean Navigation',
                duration: '5 Days',
                staffList: 'Ocean Navigation',
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
        'Gas station',
        'School',
        'Museum',
        'Mall',
        'Car workshop',
        'Highway exit',
        'Christmas market',
        'Storehouse',
        'Discotheque',
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
        'Propane depot',
        'Large Ferry Dock',
        'Forest Cabin',
        'Campsite',
        'Bus Terminal',
        'Pier',
        'Fault line',
        'Carpentry Workshop',
        'Playground',
        'Restaurant',
        'City centre',
        'Hill',
        'Laboratory',
        'Dirt Race Track',
        'Sheltered housing facility',
        'Village',
        'Valley',
        'Coast Line',
        'Construction site',
        'Ranch',
        'Beach',
        'Oil Rig',
    ],
    only_alliance_missions: [41, 61, 62, 112],
    transfer_missions: [246],
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
            0: 'Police recruit',
            200: 'Police cadet',
            10_000: 'Police officer',
            100_000: 'Police detective',
            1_000_000: 'Police corporal',
            5_000_000: 'Police sergeant',
            20_000_000: 'Police lieutenant',
            50_000_000: 'Police captain',
            1_000_000_000: 'Police commander',
            2_000_000_000: 'Deputy chief',
            5_000_000_000: 'Chief of police',
        },
    },
};
