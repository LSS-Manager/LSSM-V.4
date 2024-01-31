import moment from 'moment';

export default (LSSM: Vue, yellowBorder: number, redBorder: boolean): void => {
    moment.locale(LSSM.$stores.root.locale);

    const generationDate = moment(
        document
            .querySelector<HTMLDivElement>('#mission_general_info')
            ?.getAttribute('data-generation-time')
    );

    const general_info = document.querySelector(
        '#mission_general_info > small'
    );
    if (!general_info) return;

    const generationDateNode = document.createElement('span');
    generationDateNode.innerHTML = `<i class="fas fa-history"></i>&nbsp;${generationDate.fromNow()} (${generationDate.calendar()})`;
    document
        .querySelector<HTMLElement>('#mission_general_info > small')
        ?.append('\xa0|\xa0', generationDateNode);

    generationDateNode.style.setProperty('padding', '0 2px');

    if (yellowBorder && moment().diff(generationDate, 'hours') >= yellowBorder)
        generationDateNode.style.border = 'yellow 1px solid';

    // missions get deleted from 2am UTC onwards
    const lastUTC2am = moment.utc().hours(2).minutes(0).seconds(0);
    if (moment.utc().isBefore(lastUTC2am)) lastUTC2am.subtract(1, 'd');

    if (redBorder && generationDate.isBefore(lastUTC2am))
        generationDateNode.style.border = 'red 1px solid';
};
