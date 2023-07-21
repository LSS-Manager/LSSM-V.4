export default (): void => {
    const btn = document.querySelector(
        'div.btn-group > a[href^="/vehicles/"]:first-of-type'
    );
    const vehicleId = btn?.getAttribute('href')?.split('/')[2];
    const pABtn = document.createElement('a');
    pABtn.classList.add('btn', 'btn-default');
    pABtn.setAttribute('href', `/vehicles/${vehicleId}/zuweisung`);
    pABtn.innerHTML = '<i class="fas fa-users"></i>';
    btn?.parentElement?.append(pABtn);
};
