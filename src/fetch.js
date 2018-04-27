export default function fetchJSON(url, signal) {
    return fetch(url, signal)
        .then(response => {
            return response.json();
        });
}

