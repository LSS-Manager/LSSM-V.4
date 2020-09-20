import emojiMap from '../../../utils/emojis.json';

export default (): void => {
    console.log(emojiMap);
    document.addEventListener('keyup', e => {
        const input = e.target as HTMLInputElement;
        if (!input.matches('input')) return;
        console.log(input, input.value, e);
        input.value = input.value.replace(
            /:.*?:/g,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name => emojiMap[name] ?? name
        );
        console.log(input.value);
    });
};
