export function sortString(column: any) {
    return (a: any, b: any) => {
        if (a[column] > b[column]) return 1;
        if (a[column] < b[column]) return -1;
        return 0
    }
}

export function sortNumber(column: any) {
    return (a: any, b: any) => Number(a[column]) - Number(b[column])
}