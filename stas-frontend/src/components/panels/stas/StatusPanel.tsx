import React from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";

interface StatusPanelProps {
    stasIndex: number
}

const StatusPanel = ({stasIndex}: StatusPanelProps) => {
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state)

    return (
        <>
            <div>
                <h3>Статус</h3>
            </div>

            <div>
                <h3 style={{border: "1px solid black", padding: 5}}>{stasState}</h3>
            </div>

            <div>
                <h3>Последнее действие</h3>
            </div>

            <div>
                <h3 style={{border: "1px solid black", padding: 5}}>Неизвестно</h3>
            </div>
        </>
    );
};

export default StatusPanel;