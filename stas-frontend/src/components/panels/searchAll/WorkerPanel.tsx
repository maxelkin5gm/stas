import React, {useState} from 'react';
import InputCustom from "../../Input/InputCustom";
import {Button} from "antd";

const WorkerPanel = () => {

    const numberInputState = useState("")

    return (
        <>
            <div>
                <InputCustom type={"number"} valueState={numberInputState} placeholder={"Табельный номер"}/>
            </div>

            <div>
                <Button type="primary" size="large" onClick={()=>{console.log("test")}}>Показать выданные СТО</Button>
            </div>
        </>
    );
};

export default WorkerPanel;