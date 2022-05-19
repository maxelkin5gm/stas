import axios from "axios";

export class CellService {

    static updateNoteByCell(stasIndex: number, side: string, cellNumber: number, note: string) {
        return axios.post("/api/cell/updateNoteByCell",null, {
            params: {
                stasIndex: stasIndex + 1,
                side,
                cellNumber,
                note
            }
        })
    }
}