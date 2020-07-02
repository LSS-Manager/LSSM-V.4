import moment from 'moment';

moment.locale(BUILD_LANG);

export default (LSSM: Vue): void => {
    LSSM.$store.commit('useFontAwesome');

    const generationDate = moment(
        document
            .querySelector('#missionH1')
            ?.getAttribute('data-original-title')
            ?.replace(/^.*?:/, '')
            .trim(),
        LSSM.$t(
            'modules.extendedCallWindow.generationDate.inputFormat'
        ).toString()
    );

    const generationDateNode = document.createElement('i');
    generationDateNode.innerHTML = `&nbsp;|&nbsp;<i class="fas fa-history"></i>&nbsp;${generationDate.fromNow()} (${generationDate.calendar()})`;
    document
        .querySelector('#mission_general_info > small')
        ?.appendChild(generationDateNode);
};
