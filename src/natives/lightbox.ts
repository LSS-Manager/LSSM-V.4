if (!document.querySelector<HTMLDivElement>('#lightbox_background')) {
    const bg = document.createElement('div');
    bg.id = 'lightbox_background';
    bg.addEventListener('click', () => window.lightboxClose());
    const box = document.createElement('div');
    box.id = 'lightbox_box';
    const close = document.createElement('button');
    close.classList.add('close');
    close.type = 'button';
    close.id = 'lightbox_close';
    const times = document.createElement('span');
    times.innerHTML = '&times;';
    close.append(times);
    close.addEventListener('click', () => window.lightboxClose());
    box.append(close);
    document.body.append(bg, box);
}
