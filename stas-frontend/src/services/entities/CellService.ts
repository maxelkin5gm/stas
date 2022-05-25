import axios from "axios";
import {CellEntity} from "../../types/models";

export class CellService {

    static updateNoteBy(stasIndex: number, side: string, cellNumber: number, note: string) {
        return axios.post("/api/cell/updateNoteBy", null, {
            params: {
                stasIndex: stasIndex + 1,
                side,
                cellNumber,
                note
            }
        })
    }

    static findOrCreate(stasIndex: number, side: string, cellNumber: number) {
        return axios.get<CellEntity>("/api/cell/findOrCreate", {
            params: {
                stasIndex: stasIndex + 1,
                side,
                cellNumber,
            }
        }).then(res => res.data)
    }

}