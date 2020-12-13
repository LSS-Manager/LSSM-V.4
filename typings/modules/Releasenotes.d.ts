export interface Releasenote {
    content: string;
    timestamp: string;
}

export interface Releasenotes {
    [version: string]: Releasenote;
}

export interface ReleaseNoteProps {
    notes: [string, Releasenote][];
}
