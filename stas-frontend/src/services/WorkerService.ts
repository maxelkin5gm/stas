import {Worker} from "../store/stasReducer/types/worker.types";

export class WorkerService {

    static async findAllByName(name: string) {
        const res = await fetch("/api/worker/findByName", {
            method: "POST",
            body: name
        });

        if (res.status === 200) return await res.json() as Worker[];
        return null;
    }

    static async findByPersonnelNumber(personnelNumber: string) {
        const res = await fetch("/api/worker/findByPersonnelNumber", {
            method: "POST",
            body: personnelNumber
        });

        if (res.status === 200) return await res.json() as Worker;
        return null;
    }
}