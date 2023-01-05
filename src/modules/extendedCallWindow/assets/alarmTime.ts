export default (LSSM: Vue): void => {
    const alarmBtn =
        document.querySelector<HTMLAnchorElement>('#mission_alarm_btn');
    if (!alarmBtn) return;

    LSSM.$stores.root.addStyle({
        selectorText: `#mission_alarm_btn::after`,
        style: {
            content: '" " attr(data-alarm-time)',
        },
    });
    const getLastVehicleTime = () => {
        const vehicles = Array.from(
            document.querySelectorAll(
                '#vehicle_list_step #all .vehicle_checkbox:checked'
            )
        );
        const lastVehicle = vehicles.at(-1);
        const vehicleId = lastVehicle?.getAttribute('value');
        const alarmTime =
            document.querySelector<HTMLTableCellElement>(
                `#vehicle_list_step #all #vehicle_sort_${vehicleId}`
            )?.childNodes[0]?.textContent ?? '';
        return { lastVehicle, alarmTime };
    };

    const setAlarmTime = (alarmTime: string) => {
        alarmBtn.setAttribute('data-alarm-time', alarmTime || '');
    };

    const observer = new MutationObserver((_, observer) => {
        const { lastVehicle, alarmTime } = getLastVehicleTime();
        setAlarmTime(alarmTime);
        const vehicleId = lastVehicle?.getAttribute('value');
        const sortValue =
            document
                .querySelector<HTMLTableCellElement>(
                    `#vehicle_sort_${vehicleId}`
                )
                ?.getAttribute('sortvalue')
                ?.toString() || '99999999999';
        if (!sortValue.startsWith('9999999999')) observer.disconnect();
    });

    const update = () => {
        const { lastVehicle, alarmTime } = getLastVehicleTime();
        setAlarmTime(alarmTime);
        const calcTimeBtn =
            lastVehicle?.parentElement?.parentElement?.querySelector(
                '.calculateTime'
            ) as HTMLAnchorElement;
        if (calcTimeBtn && calcTimeBtn.parentElement) {
            calcTimeBtn.click();
            observer.observe(calcTimeBtn.parentElement, {
                childList: true,
            });
        }
    };

    const amountObserver = new MutationObserver(update);

    const amountElement =
        document.querySelector<HTMLSpanElement>('#vehicle_amount');

    if (amountElement) {
        amountObserver.observe(amountElement, {
            childList: true,
            characterData: true,
        });
    }

    update();
};
