export interface RootState {
    credits: number;
    coins: number;
    hooks: Record<string, (...args: unknown[]) => unknown>;
    menuItems: HTMLAnchorElement[];
    osmBars: Record<string, Record<string, HTMLDivElement>>;
    styleSheet: HTMLStyleElement | null;
}
