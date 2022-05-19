import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {SelectedCell} from "../../store/stasReducer/types/selectedCell";
import {StasStateEnum} from "../../store/stasReducer/types/state";
import {UtilsStore} from "../../store/UtilsStore";
import {TableTypeEnum} from "../../store/stasReducer/types/table";
import {StasStateActionTypes} from "../../store/stasReducer/stasReducer.type";


export class ActionPanelService {

    constructor(private dispatch: ReturnType<typeof useTypeDispatch>,
                private stasIndex: number,
                private selectedCell: SelectedCell) {
    }

    bringCell() {
        this.setState(StasStateEnum.GO)
        UtilsStore.setTable(this.dispatch, this.stasIndex, {
            type: TableTypeEnum.BY_CELL,
            query: {cellNumber: this.selectedCell.cellNumber, side: this.selectedCell.side}
        })
        // fetch
        setTimeout(() => {
            this.setState(StasStateEnum.WAIT)
        }, 1000)
    }

    bringBackCell() {
        this.setState(StasStateEnum.GO)
        // fetch
        setTimeout(() => {
            this.setState(StasStateEnum.READY)
        }, 2000)
    }

    removeCell() {
        this.setState(StasStateEnum.READY)
        // fetch
        this.dispatch({type: StasStateActionTypes.REFRESH_TABLE, stasIndex: this.stasIndex})
    }

    setState(state: StasStateEnum) {
        this.dispatch({
            type: StasStateActionTypes.SET_STATE,
            stasIndex: this.stasIndex,
            state
        })
    }
}