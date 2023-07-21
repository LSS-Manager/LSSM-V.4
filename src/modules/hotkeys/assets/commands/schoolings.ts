import type { Empty, Scope } from 'typings/modules/Hotkeys';

export default <Scope<Empty, [], [], true>>{
    educate() {
        // #multiple_commits is the button added by https://forum.leitstellenspiel.de/index.php?thread/23203-mehr-als-4-klassenr%C3%A4ume-zeitgleich-nutzen/
        document
            .querySelector<HTMLInputElement | HTMLSpanElement>(
                '#multiple_commits, .navbar-fixed-bottom input[name="commit"][type="submit"]'
            )
            ?.click();
    },
};
