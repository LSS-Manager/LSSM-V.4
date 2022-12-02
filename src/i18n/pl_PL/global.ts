export default {
    updateUserscript: {
        title: 'Skrypt użytkownika nieaktualny',
        text: `Drogi Użytkowniku LSSM,<br>
niestety twój skrypt użytkownika LSSM V.4 jest nieaktualny. W najnowszej wersji dokonano zmian, które są istotne dla funkcjonowania LSSM V.4.<br>
Potrzebujesz co najmniej wersji {minVersion}. Aktualizację można wygodnie wykonać, klikając {updateLink}.<br>
Czasami aktualizacja nie działa po kliknięciu linku (z nieznanych nam przyczyn). Następnie możesz uruchomić aktualizację w Tampermonkey<br>
Jeśli to również nie zadziała, edytuj skrypt LSSM w Tampermonkey, zastępując całą zawartość skryptu treścią {bypassLink}.<br>
Czasami LSSM jest instalowany wiele razy po aktualizacji. W takim przypadku warto odinstalować/usunąć wszystkie instalacje LSSM V.4 w Tampermonkey, a następnie ponownie zainstalować LSSM V.4.<br><br>
Z pozdrowieniami,<br>
twój zespół LSSM`,
        close: 'Ok',
    },
    error: {
        title: 'Menedżer LSS: błąd',
        msg: 'Jeśli ten błąd występuje często, zgłoś go zespołowi LSSM!',
        requestIssue: {
            title: 'Błędne żądanie: Status {status}',
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
            close: 'Odrzuć',
        },
    },
    warnings: {
        version: {
            title: 'Zła wersja LSS Manager',
            text: 'Drogi użytkowniku, niestety odkryliśmy, że nie masz najnowszej wersji LSS Manager. Najnowsza wersja to {version}, ale ty masz {curver}. Proszę przeładować grę  (Ctrl + F5, na urządzeniach Apple polecenie + R), to powinno naprawić błąd. Jeśli błąd będzie się powtarzał, zgłoś go zespołowi! W przypadku użycia złej wersji nie możemy zagwarantować pełnej funkcjonalności LSS-Manager.',
            close: 'Zamknij wiadomość i przeładuj grę (zalecane)',
            abort: 'Zmaknij wiadomość bez przeładowania',
        },
    },
    anniversary: {
        closeNote: 'Wskazówka: możesz również kliknąć balony, aby zamknąć!',
    },
    settings: {
        name: 'Ustawienia główne',
        labelInMenu: {
            title: 'Etykieta zamiast ikony w menu',
            description:
                'Wyświetla prostą etykietę na pasku nawigacji zamiast logo LSSM',
        },
        allowTelemetry: {
            description:
                'Kontroluje, czy LSS-Manager może wysyłać dane, które pomagają nam w rozwijaniu tego rozszerzenia.',
            title: 'Zezwól na telemetrię',
        },
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
        },
        iconBg: {
            description: 'Zmień tło likony LSSM!',
            title: 'Tło likony LSSM',
        },
        iconBgAsNavBg: {
            description:
                'Pokoloruj cały pasek nawigacyjny w kolorze tła ikony LSSM!',
            title: 'Pokoloruj pasek nawigacyjny',
        },
        loadingIndicator: {
            description:
                'Jeśli to ustawienie jest aktywne, LSSM wyświetla małe kółko ładowania w prawym dolnym rogu, gdy ładuje własne pliki.',
            title: 'Pokaż postęp ładowania',
        },
        osmDarkTooltip: {
            description:
                'To ustawienie przyciemnia podpowiedzi na mapie, jeśli włączyłeś tryb ciemny.',
            title: 'Ciemne podpowiedzi na mapie',
        },
        osmDarkControls: {
            description:
                'To ustawienie przyciemnia przyciski na mapie, jeśli włączyłeś tryb ciemny.',
            title: 'Ciemne przyciski na mapie',
        },
        v3MenuAsSubmenu: {
            title: 'V3 Menu jako podmenu',
            description:
                'Przenosi menu LSSM V3 do menu V4, aby zaoszczędzić trochę miejsca na pasku nawigacyjnym.',
        },
        debugMode: {
            title: 'Tryb debugowania',
            description:
                'Mały tryb debugowania, który wyświetla pomocne wskazówki w konsoli przeglądarki. Włączenie tej opcji jest zalecane tylko na żądanie zespołu LSSM, ponieważ konsola będzie zawierać wiele wiadomości.',
        },
    },
};
