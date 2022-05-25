import axios from "axios";
import {AutocompleteType} from "../components/Input/InputAutocomplete";

export class AutocompleteService {

    static async fillDataList(type: AutocompleteType, part: string) {
        switch (type) {
            case "nameSto":
                return await this.findAllNameStoByLike(part)

            case "nameDetail":
                return await this.findAllNameDetailByLike(part)

            case "operationNumber":
                return await this.findAllOperationNumberByLike(part)

            case "nameWorker":
                return await this.findAllWorkerByLike(part)

            case "personnelNumber":
                return await this.findAllPersonnelNumberByLike(part)
        }
    }

    static findAllNameStoByLike(part: string) {
        return axios.get<string[]>("/api/autocomplete/nameSto", {
            params: {part}
        }).then(res => res.data).catch(() => null)
    }

    static async findAllNameDetailByLike(part: string) {
        return axios.get<string[]>("/api/autocomplete/nameDetail", {
            params: {part}
        }).then(res => res.data).catch(() => null)
    }

    static async findAllOperationNumberByLike(part: string) {
        return axios.get<string[]>("/api/autocomplete/operationNumber", {
            params: {part}
        }).then(res => res.data).catch(() => null)
    }

    static async findAllWorkerByLike(part: string) {
        return axios.get<string[]>("/api/autocomplete/nameWorker", {
            params: {part}
        }).then(res => res.data).catch(() => null)
    }

    static async findAllPersonnelNumberByLike(part: string) {
        return axios.get<string[]>("/api/autocomplete/personnelNumber", {
            params: {part}
        }).then(res => res.data).catch(() => null)
    }
}