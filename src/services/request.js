const Method = {
    GET: "GET",
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

const fetchWithOptions = (url, method = "GET", data = {}) => 
{
    return fetch(url, Object.assign({
        method,
        headers: {
            Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}`,
            Accept: 'application/vnd.github.v3+json'
        },
    }, method === Method.POST | method === Method.PATCH ? { body: JSON.stringify(data) } : {})
    ).then(response => response.json()).catch((error) => console.error(error))
};

export const get = (url) =>
{
    return fetchWithOptions(url);
};

export const create = (url, data) =>
{
    return fetchWithOptions(url, Method.POST, data);
};

export const update = (url, data) =>
{
    return fetchWithOptions(url, Method.PATCH, data);
};

export const remove = (url) =>
{
    return fetchWithOptions(url, Method.DELETE);
};