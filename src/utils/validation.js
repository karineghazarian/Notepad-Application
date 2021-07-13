export const maxCharacter255 = "^.{0,255}$";
export const maxCharacter1000 = "^.{0,1000}$"

export function isValid(pattern, value)
{
    return RegExp(pattern).test(value);
}