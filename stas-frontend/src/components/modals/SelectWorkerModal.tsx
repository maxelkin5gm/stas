import React from 'react';
import {useTypeDispatch} from "../../hooks/useTypeDispatch";

import BaseModal from "./BaseModal";
import {StasStateActionTypes} from "../../store/stasReducer/stasReducer.type";
import cl from "./SelectWorkerModal.module.scss";
import {Worker} from "../../store/stasReducer/types/worker";

interface SelectWorkerModalProps {
    modalState: {
        visible: boolean,
        workers: Worker[]
    }
    onClose: () => void,
    stasIndex: number
}

const SelectWorkerModal = ({modalState, onClose, stasIndex}: SelectWorkerModalProps) => {
    const dispatch = useTypeDispatch();

    if (!modalState.visible) return null;

    const nameWorker = modalState.workers[0].nameWorker;

    function selectHandler(e: React.MouseEvent<HTMLOptionElement, MouseEvent>) {
        const personnelNumber = e.currentTarget.value;
        dispatch({
            type: StasStateActionTypes.SET_WORKER,
            stasIndex: stasIndex,
            worker: {
                nameWorker,
                personnelNumber
            }
        })
        onClose();
    }

    return (
        <BaseModal onClose={onClose}>
            <div className={cl.selectWorkerModal}>

                <h2>Найдено более одного сотрудника с ФИО: <span>{nameWorker}</span></h2>
                <h3>Выберите табельный номер</h3>

                <select multiple>
                    {modalState.workers.map((item) =>
                        <option onDoubleClick={selectHandler} value={item.personnelNumber}
                                key={item.personnelNumber}>{item.personnelNumber}</option>
                    )}
                </select>

            </div>
        </BaseModal>
    );
};

export default SelectWorkerModal;