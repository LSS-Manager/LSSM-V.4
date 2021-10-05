export default (
    btnGroup: HTMLSpanElement,
    btn: HTMLButtonElement,
    missionId: string,
    collapsedClass: string
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
    const caption = mission?.querySelector<HTMLAnchorElement>(
        `#mission_caption_${missionId}`
    );
    if (!mission || !icon || !progressBarWrapper || !progressBar || !caption)
        return;
    if (btn.classList.contains('btn-success')) {
        mission.classList.remove(collapsedClass);

        const iconPlaceholder = mission?.querySelector<HTMLDivElement>(
            `[data-collapsable-icon-placeholder="${missionId}"]`
        );
        const progressbarPlaceholder = mission?.querySelector<HTMLDivElement>(
            `[data-collapsable-progressbar-placeholder="${missionId}"]`
        );
        const captionPlaceholder = mission?.querySelector<HTMLDivElement>(
            `[data-collapsable-caption-placeholder="${missionId}"]`
        );
        if (!iconPlaceholder || !progressbarPlaceholder || !captionPlaceholder)
            return;

        iconPlaceholder.after(icon);
        iconPlaceholder.remove();

        captionPlaceholder.after(caption);
        captionPlaceholder.remove();
        progressbarPlaceholder.after(progressBarWrapper);
        progressbarPlaceholder.remove();
    } else {
        mission.classList.add(collapsedClass);

        const iconPlaceholder = document.createElement('div');
        iconPlaceholder.classList.add('hidden');
        iconPlaceholder.dataset.collapsableIconPlaceholder = missionId;
        icon.after(iconPlaceholder);
        btnGroup.after(icon);

        const progressbarPlaceholder = document.createElement('div');
        progressbarPlaceholder.classList.add('hidden');
        progressbarPlaceholder.dataset.collapsableProgressbarPlaceholder = missionId;
        progressBarWrapper.after(progressbarPlaceholder);
        const captionPlaceholder = document.createElement('div');
        captionPlaceholder.classList.add('hidden');
        captionPlaceholder.dataset.collapsableCaptionPlaceholder = missionId;
        caption.after(captionPlaceholder, progressBarWrapper);
        progressBar.prepend(caption);
    }
};
