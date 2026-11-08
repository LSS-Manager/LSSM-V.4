/**
 * Calls the callback for every mission entry once the game has finished rendering the call list.
 * On page load, the game adds most entries in a bulk mode without calling missionMarkerAdd
 * and finishes with postRenderBlock, so a hook on missionMarkerAdd alone misses them until
 * the mission gets its next update.
 * Callbacks must be idempotent, as the same entry may also be handled by a hook.
 * @param LSSM - The LSSM Vue instance.
 * @param callback - The function to call for each mission entry.
 */
export default (LSSM: Vue, callback: (mission: HTMLDivElement) => void): void =>
    LSSM.$stores.root.hook({
        event: 'postRenderBlock',
        callback: () =>
            document
                .querySelectorAll<HTMLDivElement>(
                    '#missions-panel-body .missionSideBarEntry'
                )
                .forEach(callback),
    });
