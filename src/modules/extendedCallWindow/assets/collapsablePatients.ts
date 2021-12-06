export default (
    LSSM: Vue,
    MODULE_ID: string,
    collapsablePatientsMinPatients: number
) => {
    const patients = document.querySelectorAll<HTMLDivElement>(
        '.mission_patient'
    );
    if (patients.length < collapsablePatientsMinPatients) return;
    const requirements: {
        red: Record<string, number>;
        detailed: Record<string, Record<string, number>>;
    } = {
        red: {},
        detailed: {},
    };

    const labelColors: Record<string, Record<string, string>> = {};
    const patientLabelCombis: Record<string, number> = {};

    patients.forEach(patient => {
        (
            patient
                .querySelector<HTMLDivElement>('.alert.alert-danger')
                ?.textContent?.replace(/^[^:]*:/, '')
                .trim() || ''
        )
            .split(',')
            .map(req => req.trim())
            .filter(req => req)
            .forEach(req => {
                if (!requirements.red.hasOwnProperty(req))
                    requirements.red[req] = 0;

                requirements.red[req]++;
            });
        const patientLabelCombi: Record<string, string> = {};
        patient
            .querySelectorAll<HTMLSpanElement>('small .label-left')
            .forEach(label => {
                const req = label.textContent?.trim();
                const infoLabel = label.nextElementSibling;
                const infoText = infoLabel?.textContent?.trim();
                if (!req || !infoLabel || !infoText) return;
                if (!labelColors.hasOwnProperty(req)) labelColors[req] = {};
                if (!labelColors[req].hasOwnProperty(infoText)) {
                    labelColors[req][infoText] =
                        infoLabel.classList
                            .toString()
                            .match(
                                /label-(default|success|warning|danger|info|primary)/
                            )?.[0] ?? 'label-default';
                }
                if (!requirements.detailed.hasOwnProperty(req))
                    requirements.detailed[req] = {};
                if (!requirements.detailed[req].hasOwnProperty(infoText))
                    requirements.detailed[req][infoText] = 0;
                requirements.detailed[req][infoText]++;
                patientLabelCombi[req] = infoText;
            });
        const patientLabelCombiStringified = JSON.stringify(patientLabelCombi);
        if (!patientLabelCombis.hasOwnProperty(patientLabelCombiStringified))
            patientLabelCombis[patientLabelCombiStringified] = 0;
        patientLabelCombis[patientLabelCombiStringified]++;
    });
    console.log(requirements, labelColors, patientLabelCombis);

    const hasRedTexts = Object.keys(requirements.red).length;
    const hasLabels = Object.keys(requirements.detailed).length;

    if (hasRedTexts || hasLabels) {
        const summaryBox = document.createElement('div');
        document
            .querySelector<HTMLDivElement>('.mission_patient')
            ?.before(summaryBox);
        import(
            /* webpackChunkName: "modules/extendedCallWindow/components/collapsablePatients" */
            '../components/collapsablePatients/collapsablePatients.vue'
        ).then(({ default: collapsablePatients }) =>
            new LSSM.$vue({
                store: LSSM.$store,
                i18n: LSSM.$i18n,
                render: h =>
                    h(collapsablePatients, {
                        props: {
                            featureId: `${MODULE_ID}_collapsable-patients`,
                            requirements,
                            labelColors,
                            patientLabelCombis,
                        },
                    }),
            }).$mount(summaryBox)
        );
    }

    // const summaryTexts = document.createElement('div');
    // if (hasRedTexts) {
    //     summaryTexts.classList.add('col-md-2', 'col-xs-4');
    //     const summaryTextsList = document.createElement('ul');
    //     summaryTexts.append(summaryTextsList);
    //     Object.entries(requirements.red)
    //         .sort(([reqA], [reqB]) => (reqA > reqB ? 1 : reqA < reqB ? -1 : 0))
    //         .forEach(([req, amount]) => {
    //             const listItem = document.createElement('li');
    //             listItem.innerHTML = `<b>${amount.toLocaleString()}x</b> ${req}`;
    //             summaryTextsList.append(listItem);
    //         });
    // }
    //
    // const summaryLabels = document.createElement('div');
    // const summaryLabelsList = document.createElement('ul');
    // summaryLabelsList.id = LSSM.$store.getters.nodeAttribute(
    //     'ecw_collapsable-patients_summary-box_label-summary'
    // );
    // if (hasLabels) {
    //     summaryLabels.classList.add(
    //         hasRedTexts ? 'col-md-5' : 'col-md-6',
    //         'col-xs-8'
    //     );
    //     summaryLabels.append(summaryLabelsList);
    //     Object.entries(requirements.detailed)
    //         .sort(([reqA], [reqB]) => (reqA > reqB ? 1 : reqA < reqB ? -1 : 0))
    //         .forEach(([req, labels]) => {
    //             const listItem = document.createElement('li');
    //             Object.entries(labels)
    //                 .sort(([labelA], [labelB]) =>
    //                     labelA > labelB ? 1 : labelA < labelB ? -1 : 0
    //                 )
    //                 .forEach(([value, amount]) => {
    //                     const wrapper = document.createElement('span');
    //                     wrapper.style.setProperty('display', 'inline-block');
    //                     const amountSpan = document.createElement('b');
    //                     amountSpan.textContent = `${amount.toLocaleString()}x `;
    //                     const descLabel = document.createElement('span');
    //                     descLabel.classList.add(
    //                         'label',
    //                         'label-default',
    //                         'label-left'
    //                     );
    //                     descLabel.textContent = req;
    //                     const valueLabel = document.createElement('span');
    //                     valueLabel.classList.add(
    //                         'label',
    //                         'label-right',
    //                         labelColors[req][value]
    //                     );
    //                     valueLabel.textContent = value;
    //                     wrapper.append(amountSpan, descLabel, valueLabel);
    //                     listItem.append(wrapper, document.createElement('wbr'));
    //                 });
    //             summaryLabelsList.append(listItem);
    //         });
    // }
    //
    // summaryBox.append(summaryTexts, summaryLabels);
};
