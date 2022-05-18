import {Worker} from "../store/stasReducer/types/worker.types";
import axios from "axios";
import {Dispatch} from "redux";

export class WorkerService {

    static findAllByName(nameWorker: string) {
        return axios.get<Worker[]>("/api/workerPanel/findAllByName", {params: {nameWorker}})
            .then(res => res.data)
    }

    static async findByPersonnelNumber(personnelNumber: string) {
        return axios.get<Worker>("/api/workerPanel/findByPersonnelNumber", {params: {personnelNumber}})
            .then(res => res.data)
    }
}