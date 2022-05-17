export class CellService {

    // sto panel
    static async findAllCellByStoAndStas(sto: string, stasIndex: number) {
        const res = await fetch("/data/stoPanel.findAllStoByCellAndStas.json")

        if (res.status !== 200) throw Error("Произошла ошибка связи с сервером")

        const data = await res.json();
        return data;
    }
}