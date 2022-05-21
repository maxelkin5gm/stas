import React, {useEffect, useState} from 'react';
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import cl from "./RightClickModal.module.scss"
import BaseModal from "../BaseModal";
import {DetailService} from "../../../services/DetailService";
import {DetailEntity} from "../../../types/models";
import {UtilsStore} from "../../../store/UtilsStore";

interface DetailsByStoModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    onClose: () => void,
}

/**
 *  Show all details by sto
 */
const RightClickModal = ({onClose, modalState}: DetailsByStoModalProps) => {
    const dispatch = useTypeDispatch();

    const [optionsState, setOptionsState] = useState([] as DetailEntity[])

    useEffect(() => {
        let nameSto = modalState.row.nameSto || modalState.row.receivedNameSto
        if (!nameSto) {
            UtilsStore.showError(dispatch, "СТО не найдено")
        }
        UtilsStore.setLoader(dispatch, true)
        DetailService.findAllBySto(nameSto)
            .then((options) => setOptionsState(options))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [modalState.row, dispatch])


    return (
        <BaseModal onClose={onClose}>
            <div className={cl.modal}>

                <h2>К данному STO относятся:</h2>

                {optionsState.length !== 0
                    ?
                    <div>
                        {optionsState.map(option =>
                            <p key={option.nameDetail + option.operationNumber}>
                                Деталь: <span>{option.nameDetail}</span> Операция: <span>{option.operationNumber}</span>
                            </p>
                        )}
                    </div>
                    : <h3>Детали не найдены</h3>
                }

            </div>

        </BaseModal>
    );
};

export default RightClickModal;