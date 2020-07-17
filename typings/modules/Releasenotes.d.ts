export interface Releasenote {
    description: string;
    title: string;
    version: string;
}

export interface ReleaseNoteProps {
    notes: Releasenote[];
}
