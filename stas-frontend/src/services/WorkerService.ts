import {Worker} from "../store/stasReducer/types/worker.types";

export class WorkerService {

    static async findAllByName(nameWorker: string) {
        const res = await fetch("/api/workerPanel/findAllByName", {
            method: "POST",
            body: nameWorker
        });

        if (res.status === 200) return await res.json() as Worker[];
        return null;
    }

    static async findByPersonnelNumber(personnelNumber: string) {
        const res = await fetch("/api/workerPanel/findByPersonnelNumber", {
            method: "POST",
            body: personnelNumber
        });

        if (res.status === 200) return await res.json() as Worker;
        return null;
    }
}