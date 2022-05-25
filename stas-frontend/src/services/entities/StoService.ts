import axios from "axios";

export class StoService {

    static deleteBy(nameSto: string) {
        return axios.post("/api/sto/delete", null, {
            params: {
                nameSto
            }
        })
    }
}