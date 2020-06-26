(document.querySelector(
    `.nav-tabs a[href="${window.location.hash}"]`
) as HTMLLinkElement)?.click();
