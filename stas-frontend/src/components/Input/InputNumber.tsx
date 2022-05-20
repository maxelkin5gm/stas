import React, {CSSProperties} from 'react';
import cl from "./InputNumber.module.scss";


interface InputNumberProps {
    valueState: [number, React.Dispatch<React.SetStateAction<number>>]
    style?: CSSProperties
}

const InputNumber = ({valueState, style}: InputNumberProps) => {
    return (
        <input className={cl.inputNumber} min={1} type="number"
               value={valueState[0]}
               onChange={e => valueState[1](Number(e.target.value))}
               style={style}
        />
    );
};

export default InputNumber;