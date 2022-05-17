import {TableQuery, TableTypeEnum} from "../../../store/stasReducer/types/table.types";
import {receivedStoColumns} from "../columns/stas/receivedStoColumns";
import {WorkerService} from "../../../services/WorkerService";

export async function fillSearchAllTable({type, query}: TableQuery, stasIndex: number, setTableState: Function) {
    switch (type) {

        // todo подобная реализация
        // case TableTypeEnum.WORKER:
        //     setTableState({
        //         columns: receivedStoColumns,
        //         data: await WorkerService.findAllStoByWorker(query.personnelNumber)
        //     })
        //     return;

    }
}