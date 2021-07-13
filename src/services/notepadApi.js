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
    const files = data.notes.reduce((acc, note) =>
    {
        acc[note.id] = note;
        return acc;
    }, {})
    return create(api, { description: data.title, files });
};

export const updateNotePad = (id, data) =>
{
    let obj = {};
    if (data.title)
    {
        obj.description = data.title;
    }
    if (data.files)
    {
        obj.files = data.files;
    }
    return update(`${api}/${id}`, obj);
};

export const deleteNotePad = (id) =>
{
    return remove(`${api}/${id}`)
};




