import type { ModuleMainFunction } from 'typings/Module';

export default abstract class PageObject {
    constructor(
        protected readonly moduleParams: Parameters<ModuleMainFunction>[0]
    ) {}

    public abstract init(): Promise<void>;
}
