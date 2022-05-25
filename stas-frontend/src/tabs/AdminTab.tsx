import React from 'react';
import {useTypeSelector} from "../hooks/useTypeSelector";
import cl from "./style/AdminTab.module.scss"
import StoDetailPanel from "../components/panels/admin/StoDetailPanel";
import ReceivedPanel from "../components/panels/admin/ReceivedPanel";
import ChangeCellPanel from "../components/panels/admin/ChangeCellPanel";


const AdminTab = () => {
    const tabIndex = useTypeSelector(state => state.app.tabIndex)
    const displayStyle = (tabIndex === 4) ? {} : {display: "none"}


    return (
        <div className={cl.tab} style={displayStyle}>

            <div className={cl.accordion}>

                <div className={cl.accordion__item}>
                    <input type="radio" defaultChecked name="accordion" id="accordion1"/>
                    <label className={cl.accordion__header} htmlFor="accordion1">СТО и детали</label>
                    <div className={cl.accordion__content}>
                        <StoDetailPanel/>
                    </div>
                </div>

                <div className={cl.accordion__item}>
                    <input type="radio" name="accordion" id="accordion2"/>
                    <label className={cl.accordion__header} htmlFor="accordion2">Выданные СТО</label>
                    <div className={cl.accordion__content}>
                        <ReceivedPanel/>
                    </div>
                </div>

                <div className={cl.accordion__item}>
                    <input type="radio" name="accordion" id="accordion3"/>
                    <label className={cl.accordion__header} htmlFor="accordion3">Изменение ячейки</label>
                    <div className={cl.accordion__content}>
                        <ChangeCellPanel/>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default AdminTab;