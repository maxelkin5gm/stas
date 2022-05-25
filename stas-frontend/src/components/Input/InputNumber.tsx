import React, {CSSProperties} from 'react';
import cl from "./InputNumber.module.scss";


interface InputNumberProps {
    valueState: [number, React.Dispatch<React.SetStateAction<number>>]
    style?: CSSProperties
    min?: number
}

const InputNumber = ({valueState, style, min = 0}: InputNumberProps) => {
    return (
        <input className={cl.inputNumber} min={min} type="number"
               value={valueState[0]}
               onChange={e => valueState[1](Number(e.target.value))}
               style={style}
        />
    );
};

export default InputNumber;