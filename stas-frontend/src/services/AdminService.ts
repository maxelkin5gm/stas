import axios from "axios";

export class AdminService {

    static addStoAndDetail(nameSto: string, nameDetail: string, operationNumber: string) {
        return axios.post("/api/admin/addStoAndDetail", null, {
            params: {
                nameSto,
                nameDetail,
                operationNumber
            }
        })
    }

    static deleteRelationshipByStoAndDetail(nameSto: string, nameDetail: string, operationNumber: string) {
        return axios.post("/api/admin/deleteRelationshipByStoAndDetail", null, {
            params: {
                nameSto,
                nameDetail,
                operationNumber
            }
        })
    }

    static deleteSto(nameSto: string) {
        return axios.post("/api/admin/deleteSto", null, {
            params: {
                nameSto
            }
        })
    }

    static deleteDetail(nameDetail: string, operationNumber: string) {
        return axios.post("/api/admin/deleteDetail", null, {
            params: {
                nameDetail,
                operationNumber
            }
        })
    }

    static updateAmountReceivedSto(row: any, personnelNumber: string, amount: number) {
        return axios.post("/api/admin/updateAmountReceivedSto", null, {
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
        return axios.post("/api/admin/deleteReceivedSto", null, {
            params: {
                receivedNameSto: row.receivedNameSto,
                receivedNameDetail: row.receivedNameDetail,
                receivedOperationNumber: row.receivedOperationNumber,
                personnelNumber
            }
        })
    }
}