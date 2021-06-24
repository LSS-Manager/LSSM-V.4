module.exports = {
    name: 'Contador Estados',
    description:
        'Muestra una descripción general de cuántos vehículos se encuentran en cada estado.',
    settings: {
        percentRounding: {
            title: 'Procentajes redondos',
            description:
                'Redondea los porcentajes, si se muestran, a tantos lugares decimales como sea necesario.',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Estado ${status}`,
                        description: `Muestra el número de vehículos en estado ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Estado ${status} solo si es necesario`,
                        description: `Muestra el número de vehículos en estado ${status} solo si los vehículos están en este estado.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Porcentajes de estado ${status}`,
                        description: `Muestra qué porcentaje de todos los vehículos están en estado ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Apague el parpadeo para el estado 5',
            description: 'Desactiva el parpadeo del contador de estado 5.',
        },
        s5blinkOnGt0: {
            title: 'Parpadeando para el estado 5 solo cuando sea necesario',
            description:
                'El contador de estado 5 solo parpadea cuando los vehículos están en estado 5.',
        },
    },
};
