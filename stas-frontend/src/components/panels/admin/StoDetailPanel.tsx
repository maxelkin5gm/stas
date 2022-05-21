import React, {useState} from 'react';
import {Button} from "antd";
import InputAutocomplete from "../../Input/InputAutocomplete";

const StoDetailPanel = () => {

    const valueState = useState("")

    return (
        <div style={{margin: 10}}>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{width: 200, margin: 20}}>
                    <InputAutocomplete required placeholder={"Обозначение СТО"} valueState={valueState}
                                       autocompleteType={"nameSto"}/>
                </div>
                <div style={{width: 200}}>
                    <InputAutocomplete style={{marginBottom: 5}} placeholder={"Обозначение детали"} valueState={valueState}
                                       autocompleteType={"nameDetail"}/>
                    <InputAutocomplete placeholder={"Номер операции"} valueState={valueState}
                                       autocompleteType={"operationNumber"}/>
                </div>
            </div>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button style={{width: 200, margin: "5px 20px"}} type="primary" size="middle">Добавить</Button>
                <Button style={{width: 200}} type="primary" size="middle">Удалить связь</Button>
            </div>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button style={{width: 200, margin: "5px 20px"}} type="primary" size="middle">Удалить СТО</Button>
                <Button style={{width: 200}} type="primary" size="middle">Удалить деталь</Button>
            </div>

        </div>
    );
};

export default StoDetailPanel;