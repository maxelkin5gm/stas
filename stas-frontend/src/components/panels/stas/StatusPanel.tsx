import React from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {StatusCell} from "../../../store/stasReducer/types/selectedCell";

interface StatusPanelProps {
    stasIndex: number
}

const StatusPanel = ({stasIndex}: StatusPanelProps) => {
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state)
    const selectedCell = useTypeSelector(state => state.stasList[stasIndex].selectedCell);
    let statusText = selectedCell?.status === StatusCell.INSTALLED ? "УСТАН." : null
    statusText = selectedCell?.status === StatusCell.REMOVED ? "СНЯТА" : statusText

    return (
        <>
            <div>
                <h3>Статус</h3>
            </div>

            <div>
                <h3 style={{border: "1px solid black", padding: 5}}>{stasState}</h3>
            </div>

            <div>
                <h3>Выбранная ячейка</h3>
            </div>

            <div>
                <h3 style={{border: "1px solid black", padding: 5}}>
                    {selectedCell
                        ? <>Выбрано: <span>{selectedCell.cellNumber} {selectedCell.side} {statusText}</span></>
                        : <>Ячейка не выбрана</>
                    }
                </h3>
            </div>

            {/*<div>*/}
            {/*    <h3 style={{border: "1px solid black", padding: 5}}>Неизвестно</h3>*/}
            {/*</div>*/}
        </>
    );
};

export default StatusPanel;