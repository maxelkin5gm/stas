import axios from "axios";

export class TableService {

    // Worker START //
    static async findAllByWorkerAndStas(personnelNumber: string, stasIndex: number) {
        const data = await axios.get<any[]>("/api/table/findAllByWorkerAndStas", {
            params: {
                personnelNumber,
                stasIndex: stasIndex + 1
            }
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    }

    static async findAllByWorker(personnelNumber: string) {
        const data = await axios.get<any[]>("/api/table/findAllByWorker", {
            params: {personnelNumber}
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    } // Worker END //


    // Detail START //
    static async findAllByDetailAndStas(nameDetail: string, operationNumber: string, stasIndex: number) {
        const data = await axios.get<any[]>("/api/table/findAllByDetailAndStas", {
            params: {
                nameDetail,
                operationNumber,
                stasIndex: stasIndex + 1
            }
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    }

    static async findAllByDetail(nameDetail: string, operationNumber: string) {
        const data = await axios.get<any[]>("/api/table/findAllByDetail", {
            params: {nameDetail, operationNumber}
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    } // Detail END //


    // Sto START //
    static async findAllByStoAndStas(nameSto: string, stasIndex: number) {
        const data = await axios.get<any[]>("/api/table/findAllByStoAndStas", {
            params: {
                nameSto,
                stasIndex: stasIndex + 1
            }
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    }

    static async findAllBySto(nameSto: string) {
        const data = await axios.get<any[]>("/api/table/findAllBySto", {
            params: {nameSto}
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    }

    static async findAllReceivedBySto(nameSto: string) {
        const data = await axios.get<any[]>("/api/table/findAllReceivedBySto", {
            params: {nameSto}
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    }

    static async findAllByStoAndRemainder(nameSto: string, remainder: number) {
        const data = await axios.get<any[]>("/api/table/findAllByStoAndRemainder", {
            params: {nameSto, remainder}
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    }// Sto END //


    // Cell START //
    static async findAllByCellAndStas(side: string, cellNumber: number, stasIndex: number) {
        const data = await axios.get<any[]>("/api/table/findAllByCellAndStas", {
            params: {
                side,
                cellNumber,
                stasIndex: stasIndex + 1
            }
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    }

    static async findAllByCell(side: string, cellNumber: number) {
        const data = await axios.get<any[]>("/api/table/findAllByCell", {
            params: {side, cellNumber}
        }).then(res => res.data);
        return this.validateAndPrepareArray(data)
    }// Cell END //


    static addKeyProperty(data: any[]) {
        return data.map((item: any, i: number) => {
            item.key = i + 1
            return item;
        })
    }

    static validateAndPrepareArray(data: any[]) {
        if (!data || data.length === 0) throw Error("По запросу ничего не найдено")
        return this.addKeyProperty(data)
    }
}