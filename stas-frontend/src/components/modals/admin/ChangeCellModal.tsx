import React, {useState} from 'react';
import BaseModal from "../BaseModal";
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {UtilsStore} from "../../../store/UtilsStore";
import {AdminService} from "../../../services/AdminService";
import {StatusCell} from "../../../store/stasReducer/types/selectedCell";
import {CellEntity} from "../../../types/models";

interface ChangeCellModalProps {
    onClose: () => void,
    cellEntity: CellEntity,
    setCellEntityState: React.Dispatch<React.SetStateAction<CellEntity | null>>
}

const ChangeCellModal = ({onClose, cellEntity, setCellEntityState}: ChangeCellModalProps) => {
    const dispatch = useTypeDispatch();

    const [noteInputState, setNoteInputState] = useState(cellEntity.note)
    const [statusInputState, setStatusInputState] = useState(cellEntity.status)

    function saveHandler() {
        UtilsStore.setLoader(dispatch, true)
        AdminService.changeCell(cellEntity, statusInputState, noteInputState)
            .then(() => {
                setCellEntityState({...cellEntity, status: statusInputState, note: noteInputState})
                onClose()
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    return (
        <BaseModal onClose={onClose}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <h2>Изменение ячейки: </h2>

                <select value={statusInputState}
                        onChange={(e) => setStatusInputState(e.target.value as StatusCell)}
                        style={{padding: 10, border: "1px solid black", width: "100%"}}>
                    <option>УСТАНОВЛЕНА</option>
                    <option>СНЯТА</option>
                </select>
                <textarea style={{
                    width: 300,
                    height: 200,
                    fontSize: 16,
                    border: "1px solid black",
                    marginTop: 10,
                    padding: 10,
                    resize: "none"
                }} value={noteInputState} onChange={e => setNoteInputState(e.target.value)}></textarea>
            </div>
            <Button style={{margin: 10}} type="primary" size="large" onClick={saveHandler}>Сохранить</Button>
        </BaseModal>
    );
};

export default ChangeCellModal;