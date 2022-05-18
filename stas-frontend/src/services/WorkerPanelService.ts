import React from "react";
import {useTypeDispatch} from "../hooks/useTypeDispatch";
import {AxiosError} from "axios";

import {Worker} from "../store/stasReducer/types/worker.types";
import {WorkerService} from "./WorkerService";
import {StasStateActionTypes} from "../store/stasReducer/stasReducer.type";
import {UtilsStore} from "../store/UtilsStore";

export class WorkerPanelService {

    constructor(private dispatch: ReturnType<typeof useTypeDispatch>,
                private stasIndex: number) {
    }

    async selectByNumberHandler(numberInput: string) {
        UtilsStore.setLoader(this.dispatch, true)
        try {
            const worker = await WorkerService.findByPersonnelNumber(numberInput)
            this.dispatch({type: StasStateActionTypes.SET_WORKER, worker, stasIndex: this.stasIndex});
        } catch (e) {
            if (e instanceof AxiosError && e.response!.status === 404) {
                UtilsStore.showError(this.dispatch, "Сотрудника с таким табельным номером не найдено")
            } else
                UtilsStore.showError(this.dispatch)
        } finally {
            UtilsStore.setLoader(this.dispatch, false)
        }
    }

    async selectByNameHandler(nameInput: string, setModalState: React.Dispatch<any>) {
        UtilsStore.setLoader(this.dispatch, true)
        try {
            const workers: Worker[] = await WorkerService.findAllByName(nameInput)

            if (workers.length === 0)
                UtilsStore.showError(this.dispatch, "Сотрудник с таким ФИО не найден")
            if (workers.length === 1)
                this.dispatch({type: StasStateActionTypes.SET_WORKER, worker: workers[0], stasIndex: this.stasIndex})
            if (workers.length > 1)
                setModalState({visible: true, workers})

        } catch (e) {
            UtilsStore.showError(this.dispatch)
        } finally {
            UtilsStore.setLoader(this.dispatch, false)
        }
    }

}