export default (
    btnGroup: HTMLSpanElement,
    btn: HTMLButtonElement,
    missionId: string,
    collapsedClass: string,
    collapsedBarContentClass: string
): void => {
    const mission = document.querySelector<HTMLDivElement>(
        `#mission_${missionId}`
    );
    const icon = mission?.querySelector<HTMLImageElement>(
        `#mission_vehicle_state_${missionId}`
    );
    const progressBarWrapper = mission?.querySelector<HTMLDivElement>(
        `#mission_bar_outer_${missionId}`
    );
    const progressBar = progressBarWrapper?.querySelector<HTMLDivElement>(
        `#mission_bar_${missionId}`
    );
    const pumpingWrapper = mission?.querySelector<HTMLDivElement>(
        `#pumping_bar_outer_${missionId}`
    );
    const caption = mission?.querySelector<HTMLAnchorElement>(
        `#mission_caption_${missionId}`
    );
    const countdown = mission?.querySelector<HTMLDivElement>(
        `#mission_overview_countdown_${missionId}`
    );
    if (
        !mission ||
        !icon ||
        !progressBarWrapper ||
        !progressBar ||
        !caption ||
        !countdown
    )
        return;
    if (btn.classList.contains('btn-success')) {
        mission.classList.remove(collapsedClass);

        const iconPlaceholder = mission?.querySelector<HTMLDivElement>(
            `[data-collapsable-icon-placeholder="${missionId}"]`
        );
        const progressbarPlaceholder = mission?.querySelector<HTMLDivElement>(
            `[data-collapsable-progressbar-placeholder="${missionId}"]`
        );
        const pumpingbarPlaceholder = mission?.querySelector<HTMLDivElement>(
            `[data-collapsable-pumpingbar-placeholder="${missionId}"]`
        );
        const captionPlaceholder = mission?.querySelector<HTMLDivElement>(
            `[data-collapsable-caption-placeholder="${missionId}"]`
        );
        const countdownPlaceholder = mission?.querySelector<HTMLDivElement>(
            `[data-collapsable-countdown-placeholder="${missionId}"]`
        );
        if (
            !iconPlaceholder ||
            !progressbarPlaceholder ||
            !captionPlaceholder ||
            !countdownPlaceholder
        )
            return;

        iconPlaceholder.after(icon);
        iconPlaceholder.remove();

        captionPlaceholder.after(caption);
        captionPlaceholder.remove();
        progressbarPlaceholder.after(progressBarWrapper);
        progressbarPlaceholder.remove();

        if (pumpingWrapper && pumpingbarPlaceholder) {
            pumpingbarPlaceholder.before(pumpingWrapper);
            pumpingbarPlaceholder.remove();
        } else {
            pumpingWrapper?.remove();
        }

        countdownPlaceholder.after(countdown);
        countdownPlaceholder.remove();

        mission
            ?.querySelector<HTMLDivElement>(`.${collapsedBarContentClass}`)
            ?.remove();
    } else {
        mission.classList.add(collapsedClass);

        const iconPlaceholder = document.createElement('div');
        iconPlaceholder.classList.add('hidden');
        iconPlaceholder.dataset.collapsableIconPlaceholder = missionId;
        icon.after(iconPlaceholder);
        btnGroup.after(icon);

        const progressbarPlaceholder = document.createElement('div');
        progressbarPlaceholder.classList.add('hidden');
        progressbarPlaceholder.dataset.collapsableProgressbarPlaceholder =
            missionId;
        progressBarWrapper.after(progressbarPlaceholder);
        const captionPlaceholder = document.createElement('div');
        captionPlaceholder.classList.add('hidden');
        captionPlaceholder.dataset.collapsableCaptionPlaceholder = missionId;
        caption.after(captionPlaceholder, progressBarWrapper);

        if (pumpingWrapper) {
            const pumpingPlaceholder = document.createElement('div');
            pumpingPlaceholder.classList.add('hidden');
            pumpingPlaceholder.dataset.collapsablePumpingbarPlaceholder =
                missionId;
            pumpingWrapper.after(pumpingPlaceholder);
            progressBarWrapper.prepend(pumpingWrapper);
        }

        const countdownPlaceholder = document.createElement('div');
        countdownPlaceholder.classList.add('hidden');
        countdownPlaceholder.dataset.collapsableCountdownPlaceholder =
            missionId;
        countdown.after(countdownPlaceholder);
        progressBarWrapper.append(countdown);

        const barContent = document.createElement('div');
        barContent.classList.add(collapsedBarContentClass);
        barContent.append(caption, countdown);
        progressBar.prepend(barContent);
    }
};
