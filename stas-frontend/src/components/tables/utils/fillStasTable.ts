import {TableQuery, TableTypeEnum} from "../../../store/stasReducer/types/table.types";
import {receivedStoColumns} from "../columns/stas/receivedStoColumns";
import {cellColumns} from "../columns/stas/cellColumns";
import {detailColumns} from "../columns/stas/detailColumns";
import {stoColumns} from "../columns/stas/stoColumns";
import {StoService} from "../../../services/StoService";
import {CellService} from "../../../services/CellService";

export async function fillStasTable({type, query}: TableQuery, stasIndex: number, setTableState: Function) {
    switch (type) {

        case TableTypeEnum.CLEAR:
            setTableState({columns: [], data: []})
            return;

        case TableTypeEnum.WORKER:
            setTableState({
                columns: receivedStoColumns,
                data: await StoService.findAllReceivedByWorkerAndStas(query.personnelNumber, stasIndex)
            })
            return;

        case TableTypeEnum.DETAIL:
            setTableState({
                columns: detailColumns,
                data: await StoService.findAllByDetailAndStas(query.detail, query.operationNumber, stasIndex)
            })
            return;

        case TableTypeEnum.STO:
            setTableState({
                columns: stoColumns,
                data: await CellService.findAllCellByStoAndStas(query.sto, stasIndex)
            })
            return;

        case TableTypeEnum.CELL:
            setTableState({
                columns: cellColumns,
                data: await StoService.findAllByCellAndStas(query.cellNumber, query.side, stasIndex)
            })
            return;

    }
}