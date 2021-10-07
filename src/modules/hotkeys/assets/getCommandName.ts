import { $m } from 'typings/Module';

export default (command: string, $m: $m): string =>
    `${command
        .split('.')
        .slice(0, -1)
        .map((_, index, path) =>
            $m(
                `commands.${path.slice(0, index + 1).join('.')}.title`
            ).toString()
        )
        .join(' – ')}: ${$m(`commands.${command}`).toString()}`;
