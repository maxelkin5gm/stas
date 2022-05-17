import React, {useState} from 'react';
import InputCustom from "../../Input/InputCustom";
import {Button} from "antd";

const DetailPanel = () => {
    const detailInputState = useState("");
    const numberInputState = useState("");

    return (
        <>
            <div>
                <InputCustom valueState={detailInputState} placeholder={"Обозначение детали"}/>
            </div>

            <div>
                <InputCustom valueState={numberInputState} placeholder={"Номер операции"}/>
            </div>

            <div>
                <Button type="primary" size="large">Показать</Button>
            </div>
        </>
    );
};

export default DetailPanel;