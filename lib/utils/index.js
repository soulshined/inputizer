export function isEnumValue(value, enumtype) {
    if (Object.values(enumtype).includes(undefined))
        throw Error('Enums should not have undefined values');
    return enumtype[value] !== undefined;
}
export function isString(val) {
    return typeof val === 'string';
}
export function isFunction(val) {
    return typeof val === 'function';
}
export function isBoolean(val, isStrict = false) {
    if (isStrict && typeof val === 'boolean')
        return true;
    return typeof val === 'boolean' || [0, 1].includes(+val);
}
export function clamp(value, min, max = Infinity) {
    return Math.min(Math.max(value, min), max);
}
