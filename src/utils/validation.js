export const maxCharacter255 = "^[0-9a-zA-Z]{0,255}$";
export const maxCharacter1000 = "^[0-9a-zA-Z]{0,1000}$"

export function isValid(pattern, value)
{
    return RegExp(pattern).test(value);
}