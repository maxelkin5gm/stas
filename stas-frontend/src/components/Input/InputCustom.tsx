import React, {ChangeEvent, CSSProperties, HTMLInputTypeAttribute} from 'react';
import cl from './InputcCustom.module.scss'

interface InputCustomProps {
    valueState: [string, React.Dispatch<React.SetStateAction<string>>],
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    required?: boolean,
    onFocus?: () => void,
    style?: CSSProperties
}

const InputCustom = ({type = "text", placeholder = "", valueState, required, onFocus, style}: InputCustomProps) => {

    const [value, setValue] = valueState;

    function handler(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setValue(value.toUpperCase());
    }

    return (
        <input style={style} required={required} type={type} className={cl.input} value={value} onChange={handler}
               placeholder={placeholder} onFocus={onFocus}
        />
    );
};

export default InputCustom;