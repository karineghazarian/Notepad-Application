import { get, create, remove, update } from "./request";

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
    return create(api, { description: data.title, files: { ...data.notes } });
};

export const updateNotePad = (id, data) =>
{
    return update(`${api}/${id}`, { description: data.title, files: { ...data.notes } });
};

export const deleteNotePad = (id) =>
{
    return remove(`${api}/${id}`)
};




