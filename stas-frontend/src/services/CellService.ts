export class CellService {

    // sto panel
    static async findAllCellByStoAndStas(nameSto: string, stasIndex: number) {
        const res = await fetch("/api/stoPanel/findAllByStoAndStas", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nameSto,
                stasIndex: stasIndex + 1
            })
        })

        if (res.status !== 200) throw Error("Произошла ошибка связи с сервером")

        const data = await res.json() as any;
        data.map((item: any, i: number) => {
            item.key = i
            return item;
        })
        if (data.length === 0) {
            throw Error("По запросу ничего не найдено")
        }
        return data;
    }
}