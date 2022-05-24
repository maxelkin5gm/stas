import {TableService} from "../../../services/TableService";
import {SearchAllTableQuery, SearchAllTableTypeEnum} from "../../../store/searchAllReducer/types/table";
// columns
import {receivedStoColumns} from "../columns/searchAll/receivedStoColumns";
import {detailColumns} from "../columns/searchAll/detailColumns";
import {stoColumns} from "../columns/searchAll/stoColumns";
import {workerStoColumns} from "../columns/searchAll/workersColumns";



export async function fillSearchAllTable({type, query}: SearchAllTableQuery, setTableState: Function) {
    switch (type) {

        case SearchAllTableTypeEnum.CLEAR:
            setTableState({columns: [], data: []})
            return;

        case SearchAllTableTypeEnum.BY_WORKER:
            const data = await TableService.findAllByWorker(query.personnelNumber);
            setTableState({
                columns: receivedStoColumns,
                data: TableService.validateAndPrepareArray(data),
            })
            return;

        case SearchAllTableTypeEnum.BY_DETAIL:
            setTableState({
                columns: detailColumns,
                data: await TableService.findAllByDetail(query.detail, query.operationNumber),
            })
            return;

        case SearchAllTableTypeEnum.CELL_BY_STO:
            setTableState({
                columns: stoColumns,
                data: await TableService.findAllBySto(query.nameSto),
            })
            return;

        case SearchAllTableTypeEnum.RECEIVED_BY_STO:
            setTableState({
                columns: workerStoColumns,
                data: await TableService.findAllReceivedBySto(query.nameSto),
            })
            return;

        case SearchAllTableTypeEnum.BY_STO_AND_REMAINDER:
            setTableState({
                columns: stoColumns,
                data: await TableService.findAllByStoAndRemainder(query.nameSto, query.remainder),
            })
            return;
    }
}