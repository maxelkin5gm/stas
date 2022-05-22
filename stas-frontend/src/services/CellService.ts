import axios from "axios";

export class CellService {

    static updateNoteBy(stasIndex: number, side: string, cellNumber: number, note: string) {
        return axios.post("/api/cell/updateNoteBy",null, {
            params: {
                stasIndex: stasIndex + 1,
                side,
                cellNumber,
                note
            }
        })
    }
}