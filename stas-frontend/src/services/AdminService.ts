import axios from "axios";
import {Cell} from "../components/panels/admin/CellPanel";
import {StatusCell} from "../store/stasReducer/types/selectedCell";

export class AdminService {

    // Sto and Detail //
    static addStoAndDetail(nameSto: string, nameDetail: string, operationNumber: string) {
        return axios.post("/api/admin/addStoAndDetail", null, {
            params: {
                nameSto,
                nameDetail,
                operationNumber
            }
        })
    }

    static deleteRelationshipStoAndDetail(nameSto: string, nameDetail: string, operationNumber: string) {
        return axios.post("/api/admin/deleteRelationshipStoAndDetail", null, {
            params: {
                nameSto,
                nameDetail,
                operationNumber
            }
        })
    }

    static deleteSto(nameSto: string) {
        return axios.post("/api/sto/delete", null, {
            params: {
                nameSto
            }
        })
    }

    static deleteDetail(nameDetail: string, operationNumber: string) {
        return axios.post("/api/detail/deleteBy", null, {
            params: {
                nameDetail,
                operationNumber
            }
        })
    }

    // Received STO //
    static updateAmountReceivedSto(row: any, personnelNumber: string, amount: number) {
        return axios.post("/api/receivedSto/updateAmount", null, {
            params: {
                receivedNameSto: row.receivedNameSto,
                receivedNameDetail: row.receivedNameDetail,
                receivedOperationNumber: row.receivedOperationNumber,
                personnelNumber,
                amount
            }
        })
    }

    static deleteReceivedSto(row: any, personnelNumber: string) {
        return axios.post("/api/receivedSto/delete", null, {
            params: {
                receivedNameSto: row.receivedNameSto,
                receivedNameDetail: row.receivedNameDetail,
                receivedOperationNumber: row.receivedOperationNumber,
                personnelNumber
            }
        })
    }

    static createWorker(nameWorker: string, personnelNumber: string) {
        return axios.post("/api/worker/create", null, {
            params: {
                nameWorker,
                personnelNumber
            }
        })
    }

    static deleteWorker(personnelNumber: string) {
        return axios.post("/api/worker/delete", null, {
            params: {
                personnelNumber
            }
        })
    }

    static updateWorker(personnelNumber: string, newNameWorker: string, newPersonnelNumber: string) {
        return axios.post("/api/worker/update", null, {
            params: {
                personnelNumber,
                newNameWorker,
                newPersonnelNumber
            }
        })
    }

    // Change Cell //
    static changeCellAndRemainder(row: any, remainder: number, status: StatusCell, note: string) {
        return axios.post("/api/admin/changeCellAndRemainder", null, {
            params: {
                stasIndex: row.stasIndex,
                side: row.side,
                cellNumber: row.cellNumber,
                nameSto: row.nameSto,
                remainder,
                status,
                note
            }
        })
    }

    static deleteStoFromCell(row: any) {
        return axios.post("/api/admin/deleteStoFromCell", null, {
            params: {
                stasIndex: row.stasIndex,
                side: row.side,
                cellNumber: row.cellNumber,
                nameSto: row.nameSto
            }
        })
    }

    static addStoInCell(cell: Cell, nameSto: string, remainder: number) {
        return axios.post("/api/admin/addStoInCell", null, {
            params: {
                stasIndex: cell.stasIndex + 1,
                side: cell.side,
                cellNumber: cell.cellNumber,
                nameSto,
                remainder
            }
        })
    }
}