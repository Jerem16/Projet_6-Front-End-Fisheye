export function addURLParameter(parameter, value) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(parameter, value);
    window.history.pushState({}, "", newUrl);
}

export function removeURLParameter(parameter) {
    const url = new URL(window.location.href);
    url.searchParams.delete(parameter);
    window.history.replaceState({}, "", url);
}

export function getURLParameter(parameter) {
    const url = new URL(window.location.href);
    url.searchParams.get(parameter);
}
