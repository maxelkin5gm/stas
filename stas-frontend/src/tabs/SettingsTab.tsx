import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../hooks/useTypeSelector";
import {Button} from "antd";

import cl from "./style/SettingsTab.module.scss"
import {StasService} from "../services/StasService";
import {useTypeDispatch} from "../hooks/useTypeDispatch";
import {UtilsStore} from "../store/UtilsStore";


const SettingsTab = () => {
    const dispatch = useTypeDispatch();
    const tabIndex = useTypeSelector(state => state.app.tabIndex)
    const displayStyle = (tabIndex === 5) ? {} : {display: "none"}

    const [portsState, setPortsState] = useState([] as string[])
    const [currentPortsState, setCurrentPortsState] = useState([] as string[])
    const [selectState, setSelectState] = useState("");

    useEffect(() => {
        StasService.getAllPorts().then((ports) => {
            setPortsState(ports)
            if (ports[0]) setSelectState(ports[0])
        })
        StasService.getCurrentPorts().then((ports) => {
            setCurrentPortsState(ports);
        })
    }, [tabIndex])


    function save(stasIndex: number) {
        UtilsStore.setLoader(dispatch, true);
        StasService.setPort(stasIndex, selectState)
            .then(() => {
                StasService.getCurrentPorts().then((ports) => {
                    setCurrentPortsState(ports);
                })
            })
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))

    }

    return (
        <div className={cl.tab} style={displayStyle}>

            <div className={cl.section}>
                <h2>Выбор порта СТАС 1</h2>
                <h3>Текущее значение: {currentPortsState[0]}</h3>
                <select
                    onChange={(e) => setSelectState(e.target.value)}
                    value={selectState}>
                    {portsState.map((port, index) =>
                        <option key={index}>{port}</option>
                    )}
                </select>
                <Button type="primary" size="large" onClick={() => save(0)}>Сохранить</Button>
            </div>

            <div className={cl.section}>
                <h2>Выбор порта СТАС 2</h2>
                <h3>Текущее значение: {currentPortsState[1]}</h3>
                <select
                    onChange={(e) => setSelectState(e.target.value)}
                    value={selectState}>
                    {portsState.map((port, index) =>
                        <option key={index}>{port}</option>
                    )}
                </select>
                <Button type="primary" size="large" onClick={() => save(1)}>Сохранить</Button>
            </div>

            <div className={cl.section}>
                <h2>Выбор порта СТАС 3</h2>
                <h3>Текущее значение: {currentPortsState[2]}</h3>
                <select
                    onChange={(e) => setSelectState(e.target.value)}
                    value={selectState}>
                    {portsState.map((port, index) =>
                        <option key={index}>{port}</option>
                    )}
                </select>
                <Button type="primary" size="large" onClick={() => save(2)}>Сохранить</Button>
            </div>


        </div>
    );
};

export default SettingsTab;