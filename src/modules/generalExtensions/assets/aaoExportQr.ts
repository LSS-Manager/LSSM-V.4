import QR from 'qrcode';

export default () => {
    const link = document.querySelector<HTMLAnchorElement>(
        'h3 a[href*="/aao_exports/"][href*="/import/"]'
    );
    const href = link?.href;
    if (!link || !href) return;
    const qrCanvas = document.createElement('canvas');
    QR.toCanvas(qrCanvas, link.href, {
        errorCorrectionLevel: 'high',
    }).then(() => link.parentElement?.after(qrCanvas));
};
