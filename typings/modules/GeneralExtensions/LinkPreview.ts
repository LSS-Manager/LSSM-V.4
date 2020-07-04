export interface LinkPreview {
    icon: string;
    type: string;
    id: number;
    title: string;
    additional: string;
}

export interface LinkPreviewMethods {
    setIcon(icon?: string): void;
    setType(type: string): void;
    setTitle(title: string): void;
    setId(id: number): void;
    setAdditional(additional: string): void;
}

export interface LinkPreviewComputed {
    iconClass: string;
    link: string;
}
