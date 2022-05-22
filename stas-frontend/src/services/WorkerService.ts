import {Worker} from "../store/stasReducer/types/worker";
import axios from "axios";

export class WorkerService {

    static findAllByName(nameWorker: string) {
        return axios.get<Worker[]>("/api/worker/findAllBy", {params: {nameWorker}})
            .then(res => res.data)
    }

    static findByPersonnelNumber(personnelNumber: string) {
        return axios.get<Worker>("/api/worker/findBy", {params: {personnelNumber}})
            .then(res => res.data)
    }
}