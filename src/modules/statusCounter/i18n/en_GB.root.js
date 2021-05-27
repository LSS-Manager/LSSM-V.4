export default {
    name: 'Status counter',
    description:
        'Shows a quick overview of how many vehicles are in which status.',
    settings: {
        percentRounding: {
            title: 'Round percentages',
            description:
                'Round percentages - if displayed - to as many decimal places as necessary.',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Status ${status}`,
                        description: `Show number of vehicles in status ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Status ${status} only if required`,
                        description: `Show number of vehicles in status ${status} only if vehicles are in this status.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Percentages for status ${status}`,
                        description: `Show what percentage of all vehicles are in status ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Switch off flashing for S5',
            description: 'Deactivates the flashing of the status 5 counter.',
        },
        s5blinkOnGt0: {
            title: 'Flashing for S5 only when required',
            description:
                'The status 5 counter only flashes when vehicles are in status 5.',
        },
    },
};
