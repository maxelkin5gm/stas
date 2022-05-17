import React, {ChangeEvent, HTMLInputTypeAttribute} from 'react';
import cl from './InputcCustom.module.scss'

interface InputCustomProps {
    valueState: [string, React.Dispatch<React.SetStateAction<string>>],
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    required?: boolean
}

const InputCustom = ({type = "text", placeholder = "", valueState, required}: InputCustomProps) => {

    const [value, setValue] = valueState;

    function handler(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setValue(value.toUpperCase());
    }

    return (
        <input required={required} type={type} className={cl.input} value={value} onChange={handler} placeholder={placeholder}/>
    );
};

export default InputCustom;