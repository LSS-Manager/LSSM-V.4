export interface CreateEvent {
    name: string;
    detail?: unknown;
    init?: EventInit;
}

export interface AddListener {
    name: string;
    listener(event: Event): void;
}
