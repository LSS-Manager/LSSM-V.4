export default (LSSM: Vue): void => {
    const alarmBtn = document.getElementById('mission_alarm_btn');
    if (!alarmBtn) return;

    LSSM.$store
        .dispatch('addStyle', {
            selectorText: `#mission_alarm_btn::after`,
            style: {
                content: '" " attr(data-alarm-time)',
            },
        })
        .then(() => {
            const getLastVehicleTime = () => {
                const vehicles = document.querySelectorAll(
                    '#mission-form .vehicle_checkbox:checked'
                );
                const lastVehicle = vehicles[vehicles.length - 1];
                const vehicleId = lastVehicle?.getAttribute('value');
                const alarmTime =
                    document.getElementById(`vehicle_sort_${vehicleId}`)
                        ?.textContent || '';
                return { lastVehicle, alarmTime };
            };

            const setAlarmTime = (alarmTime: string) => {
                alarmBtn.setAttribute('data-alarm-time', alarmTime || '');
            };

            const observer = new MutationObserver((_, observer) => {
                setAlarmTime(getLastVehicleTime().alarmTime);
                observer.disconnect();
            });

            document
                .getElementById('vehicle_list_step')
                ?.addEventListener('change', () => {
                    const { lastVehicle, alarmTime } = getLastVehicleTime();
                    setAlarmTime(alarmTime);
                    const calcTimeBtn = lastVehicle?.querySelector(
                        '.calculateTime'
                    ) as HTMLAnchorElement;
                    if (calcTimeBtn) {
                        calcTimeBtn.click();
                        observer.observe(calcTimeBtn, { childList: true });
                    }
                });
        });
};
