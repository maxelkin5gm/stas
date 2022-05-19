import React, {useEffect, useState} from 'react';
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import cl from "./RightClickModal.module.scss"
import BaseModal from "../BaseModal";
import {DetailService} from "../../../services/DetailService";
import {Detail} from "../../../types/models";
import {UtilsStore} from "../../../store/UtilsStore";

interface DetailsByStoModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    onClose: () => void,
}

const RightClickModal = ({onClose, modalState}: DetailsByStoModalProps) => {
    const dispatch = useTypeDispatch();

    const [optionsState, setOptionsState] = useState([] as Detail[])

    useEffect(() => {
        UtilsStore.setLoader(dispatch, true)
        DetailService.findAllBySto(modalState.row.nameSto)
            .then((options) => setOptionsState(options))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [modalState.row.nameSto, dispatch])


    return (
        <BaseModal onClose={onClose}>
            <div className={cl.modal}>

                <h2>К данному STO относятся:</h2>

                {optionsState.length !== 0
                    ?
                    <div>
                        {optionsState.map(option =>
                            <p>Деталь: <span>{option.nameDetail}</span> Операция: <span>{option.operationNumber}</span>
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