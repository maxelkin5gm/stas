export async function fetchArray(url: string, body: any, errorMessage?: string) {

    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (res.status !== 200) throw Error(errorMessage || "Произошла ошибка связи с сервером")

    const data = await res.json() as any;
    data.map((item: any, i: number) => {
        item.key = i
        return item;
    })
    if (data.length === 0) {
        throw Error("Ничего не найдено")
    }
    return data;
}