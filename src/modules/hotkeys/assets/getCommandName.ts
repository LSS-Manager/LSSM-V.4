import type { $m } from 'typings/Module';

export default (command: string, $m: $m): string => {
    const nameList = getCommandNameAsList(command, $m);
    return `${nameList.slice(0, -1).join(' – ')}: ${nameList.slice(-1)}`;
};

const getCommandNameAsList = (command: string, $m: $m): string[] =>
    command
        .split('.')
        .slice(0, -1)
        .map((_, index, path) =>
            $m(
                `commands.${path.slice(0, index + 1).join('.')}.title`
            ).toString()
        )
        .concat($m(`commands.${command}`).toString());

export { getCommandNameAsList };
