export class StoService {
    // worker panel
    static async findAllReceivedByWorkerAndStas(personnelNumber: string, stasIndex: number) {
        const res = await fetch("/api/workerPanel/findAllReceivedByWorkerAndStas", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personnelNumber,
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

    // detail panel
    static async findAllByDetailAndStas(nameDetail: string, operationNumber: string, stasIndex: number) {
        const res = await fetch("/api/detailPanel/findAllByDetail", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nameDetail,
                operationNumber,
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

    // cell panel
    static async findAllByCellAndStas(cellNumber: number, side: string, stasIndex: number) {
        const res = await fetch("/api/cellPanel/findAllByCellAndStas", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                side,
                cellNumber,
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