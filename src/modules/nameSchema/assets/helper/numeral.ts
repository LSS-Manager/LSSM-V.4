/**
 * Convert a number to a roman numeral.
 * @param num - Number to convert.
 * @returns Roman numeral.
 * @see https://stackoverflow.com/a/41358305
 */
export const convertNumberToRoman = (num: number): string => {
    const roman: Record<string, number> = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let str = '';
    let rest = num;

    for (const i of Object.keys(roman)) {
        const q = Math.floor(rest / roman[i]);
        rest -= q * roman[i];
        str += i.repeat(q);
    }

    return str;
};

/**
 * Convert a number to a string of letters.
 * @param num - Number to convert.
 * @returns String of letters.
 */
export const convertNumberToAlpha = (num: number): string => {
    let str = '';
    let rest = num;

    do {
        const q = rest % 26;
        rest = Math.floor(rest / 26);
        str = String.fromCharCode(64 + q) + str;
    } while (rest > 0);

    return str;
};

/**
 * Convert a number to ICAO alphabet word.
 * @param num - Number to convert.
 * @returns ICAO alphabet word.
 * @see https://de.wikipedia.org/wiki/ICAO-Alphabet
 */
export const convertNumberToICAOAlpha = (num: number): string => {
    const alphabet = [
        'Alfa',
        'Bravo',
        'Charlie',
        'Delta',
        'Echo',
        'Foxtrot',
        'Golf',
        'Hotel',
        'India',
        'Juliett',
        'Kilo',
        'Lima',
        'Mike',
        'November',
        'Oscar',
        'Papa',
        'Quebec',
        'Romeo',
        'Sierra',
        'Tango',
        'Uniform',
        'Victor',
        'Whiskey',
        'X-Ray',
        'Yankee',
        'Zulu',
    ];
    return alphabet[(num - 1) % alphabet.length];
};

/**
 * Convert a number to a greek letter.
 * @param num - Number to convert.
 * @returns Greek letter.
 */
export const convertNumberToGreek = (num: number): string => {
    const alphabet = [
        'Alpha',
        'Beta',
        'Gamma',
        'Delta',
        'Epsilon',
        'Zeta',
        'Eta',
        'Theta',
        'Iota',
        'Kappa',
        'Lambda',
        'My',
        'Ny',
        'Xi',
        'Omikron',
        'Pi',
        'Rho',
        'Sigma',
        'Tau',
        'Ypsilon',
        'Phi',
        'Chi',
        'Psi',
        'Omega',
    ];
    return alphabet[(num - 1) % alphabet.length];
};

/**
 * Convert a string number to a string of emoji digits.
 * @param string - String number to convert.
 * @returns String of emoji digits.
 */
export const convertStringNumberToEmoji = (string: string): string => {
    const emojiNum = (digit: number) =>
        `${String.fromCodePoint(48 + (digit % 10))}\ufe0f\u20e3`;

    let str = '';
    for (const element of string) str += emojiNum(Number(element));

    return str;
};

/**
 * Convert a number to a german phonetic alphabet word.
 * @param num - Number to convert.
 * @returns German phonetic alphabet word.
 * @see https://de.wikipedia.org/wiki/Buchstabiertafel
 */
export const convertNumberToGermanPhonetic = (num: number): string => {
    const alphabet = [
        'Anton',
        'Berta',
        'Cäsar',
        'Dora',
        'Emil',
        'Friedrich',
        'Gustav',
        'Heinrich',
        'Ida',
        'Julius',
        'Kaufmann',
        'Ludwig',
        'Martha',
        'Nordpol',
        'Otto',
        'Paula',
        'Quelle',
        'Richard',
        'Samuel',
        'Theodor',
        'Ulrich',
        'Viktor',
        'Wilhelm',
        'Xanthippe',
        'Ypsilon',
        'Zacharias',
    ];

    return alphabet[(num - 1) % alphabet.length];
};

/**
 * Convert a number to an austrian phonetic alphabet word.
 * @param num - Number to convert.
 * @returns Austrian phonetic alphabet word.
 * @see https://de.wikipedia.org/wiki/Buchstabiertafel
 */
export const convertNumberToAustrianPhonetic = (num: number): string => {
    const alphabet = [
        'Anton',
        'Berta',
        'Cäsar',
        'Dora',
        'Emil',
        'Friedrich',
        'Gustav',
        'Heinrich',
        'Ida',
        'Julius',
        'Konrad',
        'Ludwig',
        'Martha',
        'Nordpol',
        'Otto',
        'Paula',
        'Richard',
        'Siegfried',
        'Theodor',
        'Ulrich',
        'Viktor',
        'Wilhelm',
        'Xaver',
        'Ypsilon',
        'Zürich',
    ];

    return alphabet[(num - 1) % alphabet.length];
};
