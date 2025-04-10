const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiRequest = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const { method = 'GET', headers = {}, body } = options;

    const res = await fetch(url, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
    }

    return res.json();
};