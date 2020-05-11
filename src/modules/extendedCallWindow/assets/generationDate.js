import moment from 'moment';

moment.locale(BUILD_LANG);

const generationDate = moment(
    document
        .querySelector('#missionH1')
        .getAttribute('data-original-title')
        .replace(/^.*?:/, '')
        .trim(),
    window.lssmv4.$t('modules.extendedCallWindow.generationDate.inputFormat')
);

const generationDateNode = document.createElement('i');
generationDateNode.innerText = `[${generationDate.fromNow()} (${generationDate.calendar()})]`;
document
    .querySelector('#mission_general_info > small')
    .appendChild(generationDateNode);
