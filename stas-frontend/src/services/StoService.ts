export class StoService {
    // worker panel
    static async findAllReceivedByWorkerAndStas(personnelNumber: string, stasIndex: number) {
        const res = await fetch("/data/workerPanel.findAllReceivedByWorker.json")

        if (res.status !== 200) throw Error("Произошла ошибка связи с сервером")

        const data = await res.json();
        return data;
    }

    // detail panel
    static async findAllByDetailAndStas(detail: string, operationNumber: string, stasIndex: number) {
        const res = await fetch("/data/detailPanel.findAllStoByDetailAndStas.json")

        if (res.status !== 200) throw Error("Произошла ошибка связи с сервером")

        const data = await res.json();
        return data;
    }

    // cell panel
    static async findAllByCellAndStas(cellNumber: number, side: string, stasIndex: number) {
        const res = await fetch("/data/cellPanel.findAllStoByCellAndStas.json")

        if (res.status !== 200) throw Error("Произошла ошибка связи с сервером")

        const data = await res.json();
        return data;
    }
}