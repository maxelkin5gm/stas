import React, {CSSProperties, HTMLInputTypeAttribute, useEffect, useState} from 'react';
import cl from "./InputAutocomplete.module.scss";
import InputCustom from "./InputCustom";
import {AutocompleteService} from "../../services/AutocompleteService";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {UtilsStore} from "../../store/UtilsStore";

export type AutocompleteType = "nameSto" | "nameDetail" | "operationNumber" | "personnelNumber" | "nameWorker"

interface InputAutocompleteProps {
    valueState: [string, React.Dispatch<React.SetStateAction<string>>]
    autocompleteType: AutocompleteType
    type?: HTMLInputTypeAttribute
    placeholder?: string
    required?: boolean,
    style?: CSSProperties
}

const InputAutocomplete = ({
                               valueState,
                               required,
                               type,
                               placeholder,
                               autocompleteType,
                               style
                           }: InputAutocompleteProps) => {
    const dispatch = useTypeDispatch();

    const [isOpen, setIpOpen] = useState(false);
    const [dataList, setDataList] = useState([] as string[]);

    useEffect(() => {
        if (!isOpen) return
        if (!valueState[0]) setDataList([])
        const timeout = setTimeout(async () => {
            UtilsStore.setLoader(dispatch, true)
            const data = await AutocompleteService.fillDataList(autocompleteType, valueState[0])
            if (data) setDataList(data);
            UtilsStore.setLoader(dispatch, false)
        }, 100);

        return () => clearTimeout(timeout);
    }, [valueState, autocompleteType, isOpen, dispatch])

    function clickHandler(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        if (e.currentTarget.textContent) valueState[1](e.currentTarget.textContent)
    }

    function closeHandler() {
        setTimeout(() => {
            setDataList([])
            setIpOpen(false)
        }, 300);
    }

    return (
        <div className={cl.wrapper} onBlur={closeHandler}>
            <InputCustom
                style={style}
                onFocus={() => setIpOpen(true)}
                valueState={valueState}
                required={required}
                placeholder={placeholder}
                type={type}
            />
            {isOpen
                ? <ul>
                    {dataList.map((item) => <li key={item} onClick={clickHandler}>{item}</li>)}
                </ul> : null}
        </div>
    );
};

export default InputAutocomplete;