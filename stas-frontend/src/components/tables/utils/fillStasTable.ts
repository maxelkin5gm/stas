import {TableQuery, TableTypeEnum} from "../../../store/stasReducer/types/table.types";
import {TableService} from "../../../services/TableService";

// columns
import {receivedStoColumns} from "../columns/stas/receivedStoColumns";
import {cellColumns} from "../columns/stas/cellColumns";
import {detailColumns} from "../columns/stas/detailColumns";
import {stoColumns} from "../columns/stas/stoColumns";


export async function fillStasTable({type, query}: TableQuery, stasIndex: number, setTableState: Function) {
    switch (type) {

        case TableTypeEnum.CLEAR:
            setTableState({columns: [], data: []})
            return;

        case TableTypeEnum.BY_WORKER:
            setTableState({
                columns: receivedStoColumns,
                data: await TableService.findAllByWorkerAndStas(query.personnelNumber, stasIndex),
            })
            return;

        case TableTypeEnum.BY_DETAIL:
            setTableState({
                columns: detailColumns,
                data: await TableService.findAllByDetailAndStas(query.detail, query.operationNumber, stasIndex)
            })
            return;

        case TableTypeEnum.BY_STO:
            setTableState({
                columns: stoColumns,
                data: await TableService.findAllByStoAndStas(query.nameSto, stasIndex)
            })
            return;

        case TableTypeEnum.BY_CELL:
            setTableState({
                columns: cellColumns,
                data: await TableService.findAllByCellAndStas(query.side, query.cellNumber, stasIndex)
            })
            return;
    }
}