import { get, create } from "./request";

const api = "https://api.github.com/gists";

export const getNotePads = () =>
{
    return get(api)
};

export const getNotePad = (id) =>
{
    return get(`${api}/${id}`)
};

export const createNotePad = (data) =>
{
    return create(api, { files: { ...data } })
};

export const updateNotePad = (id, data) =>
{
    return create(`${api}/${id}`, data)
};

export const deleteNotePad = (id) =>
{
    return create(`${api}/${id}`)
};




