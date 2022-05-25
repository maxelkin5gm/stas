import {Worker} from "../../store/stasReducer/types/worker";
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

    static create(nameWorker: string, personnelNumber: string) {
        return axios.post("/api/worker/create", null, {
            params: {
                nameWorker,
                personnelNumber
            }
        })
    }

    static deleteBy(personnelNumber: string) {
        return axios.post("/api/worker/delete", null, {
            params: {
                personnelNumber
            }
        })
    }

    static update(personnelNumber: string, newNameWorker: string, newPersonnelNumber: string) {
        return axios.post("/api/worker/update", null, {
            params: {
                personnelNumber,
                newNameWorker,
                newPersonnelNumber
            }
        })
    }
}