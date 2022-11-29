export default {
    updateUserscript: {
        title: 'Userscript out of date',
        text: `Dear LSSM-User,<br>
unfortunately your LSSM V.4 userscript is outdated. In the latest version changes have been made to the userscript, which are important for the function of LSSM V.4.<br>
You need at least version {minVersion}, the update can be done comfortably by clicking on {updateLink}.<br>
Sometimes the update does not work by clicking the link (for unknown reasons). Then you can either trigger an update within Tampermonkey (click on the tampermonkey icon in your browser, then "Overview". Check the box in front of the LSSM userscript and select "Update" as action.<br>
If that also does not work, edit the LSSM Script within Tampermonkey by replacing all script content with the content of {bypassLink}.<br>
Sometimes, LSSM is installed multiple times after an update. In this case it helps to uninstall/remove all LSSM V.4 installations in Tampermonkey and then reinstall LSSM V.4 once.<br><br>
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
    anniversary: {
        closeNote: 'Tip: You can also click on the balloons to close!',
    },
    settings: {
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
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
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
};
