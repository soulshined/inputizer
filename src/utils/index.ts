export function isEnumValue<T>(value: any, enumtype: T) {
    if (Object.values(enumtype).includes(undefined))
        throw Error('Enums should not have undefined values');

    return enumtype[value] !== undefined;
}

export function isString(val: any): boolean {
    return typeof val === 'string';
}

export function isFunction(val: any): boolean {
    return typeof val === 'function';
}

export function isBoolean(val: any, isStrict = false) {
    if (isStrict && typeof val === 'boolean') return true;

    return typeof val === 'boolean' || [0, 1].includes(+val);
}

export function clamp(value: number, min: number, max: number = Infinity) {
    return Math.min(Math.max(value, min), max);
}