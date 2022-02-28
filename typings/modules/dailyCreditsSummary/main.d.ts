export type CreditsTypes = Record<
    string,
    {
        regex?: RegExp | string;
        title?: string;
        backgroundColor: string;
        textColor: string;
    }
>;
