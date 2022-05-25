import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import cl from "../style/DoubleClickModal.module.scss";
import BaseModal from "../BaseModal";
import {UtilsStore} from "../../../store/UtilsStore";
import {CellService} from "../../../services/entities/CellService";
import {SearchAllStateActionTypes} from "../../../store/searchAllReducer/searchAllReducer.type";


interface NoteChangeModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    onClose: () => void
}

const SearchAllDoubleClickModal = ({modalState, onClose}: NoteChangeModalProps) => {
    const dispatch = useTypeDispatch();

    const [noteInputState, setNoteInputState] = useState(modalState.row.note)

    function saveNoteHandler() {
        UtilsStore.setLoader(dispatch, true)
        CellService.updateNoteBy(modalState.row.stasIndex - 1, modalState.row.side, modalState.row.cellNumber, noteInputState)
            .then(() => {
                dispatch({type: SearchAllStateActionTypes.REFRESH_SEARCH_ALL_TABLE})
                onClose()
            })
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    return (
        <BaseModal onClose={onClose}>
            <div className={cl.modal}>
                <div style={{alignItems: "center"}} className={cl.rightSide}>
                    <h3>Изменение примечания</h3>
                    <textarea style={{width: "90%"}} value={noteInputState} onChange={e => setNoteInputState(e.target.value)}></textarea>
                    <Button type="primary" size="large" onClick={saveNoteHandler}>Сохранить</Button>
                </div>
            </div>
        </BaseModal>
    );
};

export default SearchAllDoubleClickModal;