import axios from "axios";
import {useTypeDispatch} from "../hooks/useTypeDispatch";

import {StasStateEnum} from "../store/stasReducer/types/state";
import {StasStateActionTypes} from "../store/stasReducer/stasReducer.type";
import {UtilsStore} from "../store/UtilsStore";
import {TableTypeEnum} from "../store/stasReducer/types/table";
import {StatusCell} from "../store/stasReducer/types/selectedCell";
import {StasDeliveryState} from "../types/models";

export class StasService {

    private QUERY_SPEED = 1000;

    constructor(private dispatch: ReturnType<typeof useTypeDispatch>,
                private stasIndex: number) {
    }

    async bringCell(side: string, cellNumber: number) {
        this.setState(StasStateEnum.GO)
        try {
            await this.bringCellQuery(side, cellNumber)
            await this.waitWhileGoState()
            await this.initState()
        } catch (e: any) {
            UtilsStore.showError(this.dispatch, e.response?.data?.message)
            this.setState(StasStateEnum.READY)
        }
    }

    async bringBackCell() {
        this.setState(StasStateEnum.GO)
        try {
            await this.bringBackCellQuery()
            await this.waitWhileGoState()
            await this.initState()
        } catch (e: any) {
            UtilsStore.showError(this.dispatch, e.response?.data?.message)
            this.setState(StasStateEnum.READY)
        }
    }

    async removeCell(side: string, cellNumber: number) {
        await this.removeCellQuery(side, cellNumber)
        this.setState(StasStateEnum.READY)
        this.setSelectedCell(side, cellNumber, StatusCell.REMOVED)
    }

    async returnCell(side: string, cellNumber: number) {
        await this.returnCellQuery(side, cellNumber)
        this.setState(StasStateEnum.WAIT)
        this.setCellTable(side, cellNumber)
        this.setSelectedCell(side, cellNumber, StatusCell.INSTALLED)
    }

    async initState() {
        const stasDeliveryState = await this.getState()

        if (stasDeliveryState.error) {
            UtilsStore.showError(this.dispatch, stasDeliveryState.error)
            await this.resetError();
            this.setState(StasStateEnum.READY);
            return
        }

        switch (stasDeliveryState.state) {
            case StasStateEnum.GO:
                this.setState(StasStateEnum.GO)
                await this.waitWhileGoState()
                await this.initState()
                return

            case StasStateEnum.WAIT:
                this.setState(StasStateEnum.WAIT)
                this.setCellTable(stasDeliveryState.side, stasDeliveryState.cellNumber)
                this.setSelectedCell(stasDeliveryState.side, stasDeliveryState.cellNumber, StatusCell.INSTALLED)
                return

            case StasStateEnum.READY:
                this.setState(StasStateEnum.READY)
                return

            default:
                UtilsStore.showError(this.dispatch,
                    `При инициализации СТАС ${this.stasIndex + 1} произошла ошибка. Получен неизвестный статус.`)
                return
        }
    }

    public waitWhileGoState() {
        return new Promise<void>((resolve, reject) => {
            const interval = setInterval(() => {
                this.getState()
                    .then((stasDeliveryState) => {
                        if (stasDeliveryState.state !== StasStateEnum.GO) {
                            clearInterval(interval)
                            resolve()
                        }
                    })
                    .catch((e) => {
                        clearInterval(interval)
                        reject(e.response?.data?.message)
                    })
            }, this.QUERY_SPEED)
        })
    }


    // fetch
    private getState() {
        return axios.get<StasDeliveryState>("/api/delivery/getState", {
            params: {stasIndex: this.stasIndex}
        }).then(res => res.data)
    }

    private resetError() {
        return axios.post<StasDeliveryState>("/api/delivery/resetError", null, {
            params: {stasIndex: this.stasIndex}
        })
    }

    private bringCellQuery(side: string, cellNumber: number) {
        return axios.post<void>("/api/delivery/bringCell", null, {
            params: {
                stasIndex: this.stasIndex,
                side,
                cellNumber
            }
        })
    }

    private bringBackCellQuery() {
        return axios.post<void>("/api/delivery/bringBackCell", null, {
            params: {stasIndex: this.stasIndex,}
        })
    }

    private removeCellQuery(side: string, cellNumber: number) {
        return axios.post<void>("/api/delivery/removeCell", null, {
            params: {
                stasIndex: this.stasIndex,
                side,
                cellNumber
            }
        })
    }

    private returnCellQuery(side: string, cellNumber: number) {
        return axios.post<void>("/api/delivery/returnCell", null, {
            params: {
                stasIndex: this.stasIndex,
                side,
                cellNumber
            }
        })
    }


    // utils
    private setSelectedCell(side: string, cellNumber: number, status: StatusCell) {
        this.dispatch({
            type: StasStateActionTypes.SET_SELECTED_CELL,
            stasIndex: this.stasIndex,
            selectedCell: {
                side,
                cellNumber,
                status
            }
        })
    }

    private setCellTable(side: string, cellNumber: number) {
        UtilsStore.setTable(this.dispatch, this.stasIndex, {
            type: TableTypeEnum.BY_CELL,
            query: {side, cellNumber}
        })
    }

    private setState(state: StasStateEnum) {
        this.dispatch({
            type: StasStateActionTypes.SET_STATE,
            stasIndex: this.stasIndex,
            state
        })
    }
}