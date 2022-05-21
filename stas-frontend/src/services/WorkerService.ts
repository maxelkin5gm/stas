import {Worker} from "../store/stasReducer/types/worker";
import axios from "axios";

export class WorkerService {

    static findAllByName(nameWorker: string) {
        return axios.get<Worker[]>("/api/worker/findAllByName", {params: {nameWorker}})
            .then(res => res.data)
    }

    static findByPersonnelNumber(personnelNumber: string) {
        return axios.get<Worker>("/api/worker/findByPersonnelNumber", {params: {personnelNumber}})
            .then(res => res.data)
    }
}