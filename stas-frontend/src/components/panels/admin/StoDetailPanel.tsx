import React, {useState} from 'react';
import {Button} from "antd";
import InputAutocomplete from "../../Input/InputAutocomplete";
import {AdminService} from "../../../services/AdminService";
import {UtilsStore} from "../../../store/UtilsStore";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {StoService} from "../../../services/entities/StoService";
import {DetailService} from "../../../services/entities/DetailService";

const StoDetailPanel = () => {
    const dispatch = useTypeDispatch();

    const nameStoState = useState("")
    const nameDetailState = useState("")
    const operationNumberState = useState("")


    function addHandler() {
        if (!nameStoState[0] || !nameDetailState[0] || !nameDetailState[0]) {
            UtilsStore.showError(dispatch, "Не все данные заполнены")
            return
        }

        UtilsStore.setLoader(dispatch, true)
        AdminService.addStoAndDetail(nameStoState[0], nameDetailState[0], operationNumberState[0])
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function deleteRelationshipHandler() {
        if (!nameStoState[0] || !nameDetailState[0] || !nameDetailState[0]) {
            UtilsStore.showError(dispatch, "Не все данные заполнены")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        AdminService.deleteRelationshipStoAndDetail(nameStoState[0], nameDetailState[0], operationNumberState[0])
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function deleteStoHandler() {
        if (!nameStoState[0]) {
            UtilsStore.showError(dispatch, "Не все данные заполнены")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        StoService.deleteBy(nameStoState[0])
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function deleteDetailHandler() {
        if (!nameDetailState[0] || !nameDetailState[0]) {
            UtilsStore.showError(dispatch, "Не все данные заполнены")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        DetailService.deleteBy(nameDetailState[0], operationNumberState[0])
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    return (
        <div style={{margin: 10}}>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{width: 200, margin: 20}}>
                    <InputAutocomplete required placeholder={"Обозначение СТО"} valueState={nameStoState}
                                       autocompleteType={"nameSto"}/>
                </div>
                <div style={{width: 200}}>
                    <InputAutocomplete style={{marginBottom: 5}} placeholder={"Обозначение детали"}
                                       valueState={nameDetailState}
                                       autocompleteType={"nameDetail"}/>
                    <InputAutocomplete placeholder={"Номер операции"} valueState={operationNumberState}
                                       autocompleteType={"operationNumber"}/>
                </div>
            </div>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button style={{width: 200, margin: "5px 20px"}} type="primary" size="middle"
                        onClick={addHandler}>Добавить</Button>
                <Button style={{width: 200}} type="primary" size="middle"
                        onClick={deleteRelationshipHandler}>Удалить связь</Button>
            </div>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button style={{width: 200, margin: "5px 20px"}} type="primary" size="middle"
                        onClick={deleteStoHandler}>Удалить СТО</Button>
                <Button style={{width: 200}} type="primary" size="middle"
                        onClick={deleteDetailHandler}>Удалить деталь</Button>
            </div>

        </div>
    );
};

export default StoDetailPanel;