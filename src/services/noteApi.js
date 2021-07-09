import { get, create } from "./request";

const api = "https://api.github.com/notes";

export const getNotes = () =>
{
    return get(api)
};

export const getNote = (id) =>
{
    return get(`${api}/${id}`)
};

export const createNote = (data) =>
{
    return create(api, data)
};

export const updateNote = (id, data) =>
{
    return create(`${api}/${id}`, data)
};

export const deleteNote = (id) =>
{
    return create(`${api}/${id}`)
};