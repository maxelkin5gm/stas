import React from 'react';
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {useTypeSelector} from "../../hooks/useTypeSelector";

import {AppStateActionTypes} from "../../store/appReducer/appReducer.type";
import BaseModal from "./BaseModal";

const ErrorModal = () => {
    const errorModal = useTypeSelector(state => state.app.errorModal);
    const dispatch = useTypeDispatch();

    function closeHandler() {
        dispatch({type: AppStateActionTypes.SET_ERROR_MODAL, visible: false, title: "", text: ""})
    }

    if (!errorModal.visible) return null;

    return (
        <BaseModal onClose={closeHandler}>
            <h1>{errorModal.title}</h1>
            <h3 style={{marginBottom: "20px"}}>{errorModal.text}</h3>
        </BaseModal>
    );
};

export default ErrorModal;