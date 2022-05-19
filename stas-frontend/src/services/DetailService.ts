import axios from "axios";
import {Detail} from "../types/models";

export class DetailService {

    static findAllBySto(nameSto: string) {
        return axios.get<Detail[]>("/api/detail/findAllBySto", {
            params: {nameSto}
        })
            .then(res => res.data)
            .catch(() => [] as Detail[])
    }
}