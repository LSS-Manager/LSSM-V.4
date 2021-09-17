document
    .querySelectorAll<HTMLAnchorElement>(
        'footer a[href^="/"]:not(.lightbox-open)'
    )
    .forEach(link => link.classList.add('lightbox-open'));
document
    .querySelectorAll<HTMLAnchorElement>(
        'footer a[href^="https"]:not([target="_blank"]):not([onclick*="switchWorld"])'
    )
    .forEach(link => link.setAttribute('target', '_blank'));
