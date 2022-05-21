import React from 'react';
import {useTypeSelector} from "../hooks/useTypeSelector";

import cl from "./style/SearchAllTab.module.scss";
import WorkerPanel from "../components/panels/searchAll/WorkerPanel";
import DetailPanel from "../components/panels/searchAll/DetailPanel";
import StoPanel from "../components/panels/searchAll/StoPanel";
import RemainderStoPanel from "../components/panels/searchAll/RemainderStoPanel";
import TablePanel from "../components/panels/searchAll/TablePanel";

const SearchAllTab = () => {
    const tabIndex = useTypeSelector(state => state.app.tabIndex)
    const displayStyle = (tabIndex === 3) ? {} : {display: "none"}

    return (
        <div className={cl.tab} style={displayStyle}>

            <div className={cl.worker}>
                <WorkerPanel/>
            </div>

            <div className={cl.detail}>
                <DetailPanel/>
            </div>

            <div className={cl.sto}>
                <StoPanel/>
            </div>

            <div className={cl.remainderSto}>
                <RemainderStoPanel/>
            </div>

            <div className={cl.table}>
                <TablePanel/>
            </div>

        </div>
    );
};

export default SearchAllTab;