export const maxCharacter255 = "^[0-9a-zA-Z]{0,4}$";
export const maxCharacter1024 = "^[0-9a-zA-Z]{0,4}$"

export function isValid(pattern, value)
{
    return RegExp(pattern).test(value);
}