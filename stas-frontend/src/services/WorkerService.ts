import {Worker} from "../store/stasReducer/types/worker.types";
import axios from "axios";

export class WorkerService {

    static findAllByName(nameWorker: string) {
        return axios.get<Worker[]>("/api/workerPanel/findAllByName", {params: {nameWorker}})
            .then(res => res.data)
    }

    static findByPersonnelNumber(personnelNumber: string) {
        return axios.get<Worker>("/api/workerPanel/findByPersonnelNumber", {params: {personnelNumber}})
            .then(res => res.data)
    }
}