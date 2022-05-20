import axios from "axios";
import {DetailEntity} from "../types/models";

export class DetailService {

    static findAllBySto(nameSto: string) {
        return axios.get<DetailEntity[]>("/api/detail/findAllBySto", {
            params: {nameSto}
        })
            .then(res => res.data)
            .catch(() => [] as DetailEntity[])
    }
}