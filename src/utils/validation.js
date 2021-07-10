export const maxCharacter255 = "^[0-9a-zA-Z]{0,3}$";
export const maxCharacter1024 = "^[0-9a-zA-Z]{0,1024}$"

export default function isValid(pattern, value)
{
    return RegExp(pattern).test(value);
}