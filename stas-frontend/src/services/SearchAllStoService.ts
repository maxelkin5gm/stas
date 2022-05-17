export class SearchAllStoService {
    // worker panel
    static async findAllReceivedByWorker(personnelNumber: string) {
        const res = await fetch("/data/workerPanel.findAllReceivedByWorker.json")

        if (res.status !== 200) throw Error("Произошла ошибка связи с сервером")

        const data = await res.json();
        return data;
    }

    // detail panel
    static async findAllByDetail(detail: string, operationNumber: string) {
        const res = await fetch("/data/detailPanel.findAllStoByDetailAndStas.json")

        if (res.status !== 200) throw Error("Произошла ошибка связи с сервером")

        const data = await res.json();
        return data;
    }

    // sto panel
    static async findAllCellBySto(sto: string) {
        const res = await fetch("/data/stoPanel.findAllStoByCellAndStas.json")

        if (res.status !== 200) throw Error("Произошла ошибка связи с сервером")

        const data = await res.json();
        return data;
    }

    // remainder sto panel
    static async findAllCellByStoAndRemainder(sto: string, remainder: number) {
    }
}