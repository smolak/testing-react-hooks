export async function latest() {
    const response = await fetch('/api/info.0.json');

    return await response.json();
}

export async function episode(number) {
    const response = await fetch(`/api/${number}info.0.json`);

    return JSON.stringify(await response.json());
}
