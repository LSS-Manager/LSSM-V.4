if (!document.getElementById('lightbox_background')) {
    const bg = document.createElement('div');
    bg.id = 'lightbox_background';
    bg.addEventListener('click', window.lightboxClose);
    const box = document.createElement('div');
    box.id = 'lightbox_box';
    const close = document.createElement('button');
    close.classList.add('close');
    close.type = 'button';
    close.id = 'lightbox_close';
    const times = document.createElement('span');
    times.innerHTML = '&times;';
    close.appendChild(times);
    close.addEventListener('click', window.lightboxClose);
    box.appendChild(close);
    document.body.appendChild(bg);
    document.body.appendChild(box);
}
