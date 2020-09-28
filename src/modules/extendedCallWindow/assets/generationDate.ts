import moment from 'moment';

moment.locale(BUILD_LANG);

export default (LSSM: Vue): void => {
    LSSM.$store.commit('useFontAwesome');

    const generationDate = moment(
        document
            .getElementById('mission_general_info')
            ?.getAttribute('data-generation-time')
    );

    const generationDateNode = document.createElement('i');
    generationDateNode.innerHTML = `&nbsp;|&nbsp;<i class="fas fa-history"></i>&nbsp;${generationDate.fromNow()} (${generationDate.calendar()})`;
    document
        .querySelector('#mission_general_info > small')
        ?.appendChild(generationDateNode);
};
