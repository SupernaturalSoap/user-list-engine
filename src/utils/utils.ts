export function isEmpty(obj?: unknown) {
    if (obj === undefined || obj === null) {
        return true;
    }
}

export function isArrayValid(arr: any): boolean {
    return Array.isArray(arr);
}

export function isArrayEmpty(arr: any): boolean {
    return isArrayValid(arr) && arr.length === 0;
}

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
        array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
}