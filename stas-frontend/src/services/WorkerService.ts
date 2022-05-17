import {Worker} from "../store/stasReducer/types/worker.types";

export class WorkerService {

    static async findAllByName(name: string) {
        const res = await fetch("/data/workerPanel.findAllByName.json");

        if (res.status !== 200) return null;

        const data = await res.json();
        return data as Worker[];
    }

    static async findByPersonnelNumber(personnelNumber: string) {
        const res = await fetch("/data/workerPanel.findByPersonnelNumber.json");

        if (res.status !== 200) return null;

        const data = await res.json();
        // return data as Worker;
        return null;
    }
}