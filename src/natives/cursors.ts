import lssmLogo from '../img/lssm_logo';

const resizeLSSMImage = (callback: (dataUrl: string) => void) => {
    const sourceImage = new Image();

    const sourceSize = [870, 570];
    const targetWidth = 40;
    const targetHeight = sourceSize[1] / (sourceSize[0] / targetWidth);
    sourceImage.addEventListener('load', () => {
        // Create a canvas with the desired dimensions
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Scale and draw the source image to the canvas
        canvas
            .getContext('2d')
            ?.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);

        // Convert the canvas to a data URL in PNG format
        callback(canvas.toDataURL());
    });

    sourceImage.src = lssmLogo.toString();
};

const style = document.createElement('style');
style.id = 'cursors';
style.textContent = Object.entries(<Record<string, string>>{
    '[id^="lssmv4-"]': '❤️',
    '[href^="/missions/"]': '🚨',
    '[href^="/buildings/"]': '🏡',
    '[href^="/vehicles/"]': '🚒',
    '[href^="/profile/"]': '👮',
    '#map': '🗺',
})
    .map(([selector, text]) => {
        const ctx = document.createElement('canvas').getContext('2d');
        const font = '24px sans-serif';
        const baseLine = 'top';

        if (!ctx) return '';

        ctx.font = font;
        ctx.textBaseline = baseLine;
        const textMetrics = ctx.measureText(text);
        const width = textMetrics.width + 4;
        const height = Math.ceil(
            Math.abs(textMetrics.actualBoundingBoxDescent) +
                Math.abs(textMetrics.actualBoundingBoxAscent)
        );

        const newCanvas = document.createElement('canvas');
        newCanvas.width = width;
        newCanvas.height = height;
        const newCtx = newCanvas.getContext('2d');
        if (!newCtx) return '';
        newCtx.font = font;
        newCtx.textBaseline = 'middle';
        newCtx.fillText(text, 2, height / 2);

        return `${selector}{cursor:url(${newCanvas.toDataURL()}) ${width / 2} ${
            height / 2
        }, auto !important;}`;
    })
    .join('\n');

resizeLSSMImage(
    logo =>
        (style.textContent += `html{cursor:url(${logo}) 16 16, auto !important;}`)
);

document.head.append(style);
