if (window.location.pathname === '/') {
    document
        .querySelector('#navbar-main-collapse > ul')
        .insertAdjacentHTML(
            'beforeend',
            `<li><a class="lightbox-open" href="/profile/${window.user_id}">${window.user_id}</a></li>`
        );
}
if (window.location.pathname.match(/\/profile\/\d+/)) {
    document.querySelector(
        'h1'
    ).innerHTML += `&nbsp;<small>(${window.location.pathname.replace(
        /\D+/g,
        ''
    )})</small>`;
}
