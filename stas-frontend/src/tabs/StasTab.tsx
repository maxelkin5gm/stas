import React from 'react';
import {useTypeSelector} from "../hooks/useTypeSelector";

import cl from "./style/StasTab.module.scss"
import WorkerPanel from "../components/panels/stas/WorkerPanel";
import TablePanel from "../components/panels/stas/TablePanel";
import DetailPanel from "../components/panels/stas/DetailPanel";
import StoPanel from "../components/panels/stas/StoPanel";
import CellPanel from "../components/panels/stas/CellPanel";
import ActionPanel from "../components/panels/stas/ActionPanel";
import StatusPanel from "../components/panels/stas/StatusPanel";
import CartPanel from "../components/panels/stas/CartPanel";

interface StasTabProps {
    stasIndex: number,
}

const StasTab = ({stasIndex}: StasTabProps) => {
    const tabIndex = useTypeSelector(state => state.app.tabIndex)
    const displayStyle = (tabIndex === stasIndex) ? {} : {display: "none"}

    return (
        <div className={cl.tab} style={displayStyle}>
            <div className={cl.worker}>
                <WorkerPanel stasIndex={stasIndex}/>
            </div>
            <div className={cl.detail}>
                <DetailPanel stasIndex={stasIndex}/>
            </div>
            <div className={cl.sto}>
                <StoPanel stasIndex={stasIndex}/>
            </div>
            <div className={cl.cell}>
                <CellPanel stasIndex={stasIndex}/>
            </div>
            <div className={cl.table}>
                <TablePanel stasIndex={stasIndex}/>
            </div>
            <div className={cl.cart}>
                <CartPanel stasIndex={stasIndex} />
            </div>
            <div className={cl.action}>
                <ActionPanel stasIndex={stasIndex} />
            </div>
            <div className={cl.status}>
                <StatusPanel stasIndex={stasIndex} />
            </div>
        </div>
    );
};

export default StasTab;