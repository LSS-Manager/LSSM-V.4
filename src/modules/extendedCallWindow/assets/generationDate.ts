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
    generationDateNode.innerHTML = `&nbsp;|&nbsp;<i class="fas fa-history"></i>&nbsp;${generationDate.fromNow()} (${generationDate.calendar()})`;
    document
        .querySelector<HTMLElement>('#mission_general_info > small')
        ?.append(generationDateNode);

    generationDateNode.style.paddingLeft = '2px';
    generationDateNode.style.paddingRight = '2px';

    if (yellowBorder && moment().diff(generationDate, 'hours') >= yellowBorder)
        generationDateNode.style.border = 'yellow 1px solid';

    // missions get deleted from 2am UTC onwards, so if we are after 2am UTC, we need to add 1 day for next deletion
    const nextDeletion = moment.utc();
    if (moment().hours() >= 2) nextDeletion.add(1, 'd');
    nextDeletion.hours(2).minutes(0);

    if (redBorder && generationDate.isBefore(nextDeletion.subtract(1, 'd')))
        generationDateNode.style.border = 'red 1px solid';
};
