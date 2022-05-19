export function addKeyPropertyForArray(data: any[]) {
    return data.map((item: any, i: number) => {
        item.key = i + 1
        return item;
    })
}