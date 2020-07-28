import svgToMiniDataURI from 'mini-svg-data-uri';

const fmsColors = {
    1: {
        background: '#5a97f3',
        color: 'white',
    },
    2: {
        background: '#77dc81',
        color: 'black',
    },
    3: {
        background: '#f3d470',
        color: 'black',
    },
    4: {
        background: '#f58558',
        color: 'black',
    },
    5: {
        background: '#ff0000',
        color: 'white',
    },
    6: {
        background: '#000000',
        color: 'white',
    },
    7: {
        background: '#ff8600',
        color: 'black',
    },
    9: {
        background: '#f3d470',
        color: 'black',
    },
} as {
    [fms: number]: {
        background: string;
        color: 'black' | 'white';
    };
};

export default (fms_real: number, fms: number): string =>
    svgToMiniDataURI(
        `<svg width="50" height="50" overflow="hidden" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g><rect fill="${fmsColors[
            fms_real
        ]?.background ??
            'black'}" stroke="#000" stroke-width="0" x="0" y="0" width="50" height="50" stroke-dasharray="none" fill-opacity="1" rx="10%"></rect><text font-size="24" font-weight="bold" transform="matrix(1.77389, 0, 0, 1.77389, -12.8959, -23.9464)" font-family="Helvetica, Arial, sans-serif" y="35.93269" x="14.68916" stroke-width="0" stroke="#000" fill="${fmsColors[
            fms_real
        ]?.color ?? 'white'}">${fms}</text></g></svg>`
    );
