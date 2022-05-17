import React, {useState} from 'react';
import InputCustom from "../../Input/InputCustom";
import {Button} from "antd";

const StoPanel = () => {
    const stoInputState = useState("");

    return (
        <>
            <div>
                <InputCustom valueState={stoInputState} placeholder={"Обозначение СТО"}/>
            </div>

            <div>
                <Button type="primary" size="large">Показать ячейки</Button>
            </div>

            <div>
                <Button type="primary" size="large">Показать кому выдано</Button>
            </div>
        </>
    );
};

export default StoPanel;