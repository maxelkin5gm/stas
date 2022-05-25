import axios from "axios";
import {StatusCell} from "../store/stasReducer/types/selectedCell";
import {CellEntity} from "../types/models";

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


    // Change Cell //
    static changeStoInCell(row: any, remainder: number) {
        return axios.post("/api/admin/changeStoInCell", null, {
            params: {
                stasIndex: row.stasIndex,
                side: row.side,
                cellNumber: row.cellNumber,
                nameSto: row.nameSto,
                remainder
            }
        })
    }
    static changeCell(cellEntity: CellEntity, status: StatusCell, note: string) {
        return axios.post("/api/admin/changeCell", null, {
            params: {
                stasIndex: cellEntity.stasIndex + 1,
                side: cellEntity.side,
                cellNumber: cellEntity.cellNumber,
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

    static addStoInCell(cellEntity: CellEntity, nameSto: string, remainder: number) {
        return axios.post("/api/admin/addStoInCell", null, {
            params: {
                stasIndex: cellEntity.stasIndex + 1,
                side: cellEntity.side,
                cellNumber: cellEntity.cellNumber,
                nameSto,
                remainder
            }
        })
    }
}