/**
 * This feature allows to select users from a suggestion list of alliance members
 *  when either typing the name to whisper or to mention in the alliance chat.
 * It also indicates when the user is trying to mention / whisper to an alliance member
 *  that does not exist in the alliance.
 *
 * @param LSSM - The current local LSSM instance.
 */
export default (LSSM: Vue) => {
    LSSM.$stores.api.autoUpdateAllianceInfo('ce-user_selection').then();

    const chatInput = document.querySelector<HTMLInputElement>(
        '#alliance_chat_message'
    );
    if (!chatInput) return;

    chatInput.addEventListener('input', () => {
        const users = LSSM.$stores.api.allianceinfo?.users;
        if (!users) return;

        // whisper-mode: currently at entering username
        if (chatInput.value.match(/^\/w [^ ]+$/u)) {
            const usernameInput = chatInput.value
                .replace(/^\/w /u, '')
                .toLowerCase();
            const filteredUsers = users
                .filter(({ name }) =>
                    name.toLowerCase().includes(usernameInput)
                )
                .map(({ name, id, online }) => ({
                    name,
                    relevance:
                        Number(name.toLowerCase().startsWith(usernameInput)) +
                        Number(online) +
                        Number(
                            !!document.querySelector<HTMLAnchorElement>(
                                `#mission_chat_messages .mission_chat_message_username a[href="/profile/${id}"]`
                            )
                        ) *
                            2,
                }));
            const filteredUsersSorted = filteredUsers.sort(
                (a, b) => b.relevance - a.relevance
            );
            const shownUsers = filteredUsersSorted
                .slice(0, 5)
                .map(({ name }) => name);
            console.log(filteredUsers, filteredUsersSorted, shownUsers);
        }
    });
};
