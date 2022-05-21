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
}