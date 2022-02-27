export interface Releasenote {
    content: string;
    timestamp: string;
}

export type Releasenotes = Record<string, Releasenote>;

export interface ReleaseNoteComputed {
    minors: Record<string, ReleaseNoteProps['notes']>;
}

export interface ReleaseNoteProps {
    notes: [string, Releasenote][];
    last_seen?: string;
}
