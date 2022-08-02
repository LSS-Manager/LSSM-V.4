export default () =>
    document
        .querySelector<HTMLAnchorElement>(
            '.alert.alert-danger:not(.alert-missing-vehicles) a.btn.btn-success[href^="/vehicles/"]'
        )
        ?.click();
