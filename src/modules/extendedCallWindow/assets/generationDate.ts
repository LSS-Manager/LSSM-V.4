import moment from 'moment';

export default (LSSM: Vue, yellowBorder: number, redBorder: boolean): void => {
    moment.locale(LSSM.$store.state.lang);

    LSSM.$store.commit('useFontAwesome');

    const generationDate = moment(
        document
            .getElementById('mission_general_info')
            ?.getAttribute('data-generation-time')
    );

    const general_info = document.querySelector(
        '#mission_general_info > small'
    );
    if (!general_info) return;

    const generationDateNode = document.createElement('span');
    generationDateNode.innerHTML = `&nbsp;|&nbsp;<i class="fas fa-history"></i>&nbsp;${generationDate.fromNow()} (${generationDate.calendar()})`;
    document
        .querySelector('#mission_general_info > small')
        ?.append(generationDateNode);

    generationDateNode.style.paddingLeft = '2px';
    generationDateNode.style.paddingRight = '2px';

    if (yellowBorder && moment().diff(generationDate, 'hours') >= yellowBorder)
        generationDateNode.style.border = 'yellow 1px solid';

    if (
        redBorder &&
        (generationDate.hours() <= 3 || generationDate.day() !== moment().day())
    )
        generationDateNode.style.border = 'red 1px solid';
};
