export default () => {
    const historyBtn = document.querySelector<HTMLAnchorElement>(
        '#alliance_chat [href="/alliance_chats"]'
    );
    const heading = document.querySelector<HTMLDivElement>(
        '#chat_panel_heading'
    );
    if (historyBtn && heading) heading.prepend(historyBtn.cloneNode(true));
};
