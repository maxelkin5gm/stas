import React, {useState} from 'react';
import BaseModal from "../BaseModal";
import InputNumber from "../../Input/InputNumber";
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {UtilsStore} from "../../../store/UtilsStore";
import {AdminService} from "../../../services/AdminService";
import {StatusCell} from "../../../store/stasReducer/types/selectedCell";

interface ChangeCellModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    onClose: () => void
    fillTable: () => void
}

const ChangeCellAndRemainderModal = ({onClose, modalState, fillTable}: ChangeCellModalProps) => {
    const dispatch = useTypeDispatch();

    const inputAmountState = useState(modalState.row.remainder as number)
    const [noteInputState, setNoteInputState] = useState(modalState.row.note as string)
    const [statusInputState, setStatusInputState] = useState(modalState.row.status as StatusCell)

    function saveHandler() {
        if (inputAmountState[0] < 0) {
            UtilsStore.showError(dispatch, "Не правильно введен остаток");
            return
        }
        UtilsStore.setLoader(dispatch, true)
        AdminService.changeCellAndRemainder(modalState.row, inputAmountState[0], statusInputState, noteInputState)
            .then(() => {
                fillTable();
                onClose()
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function deleteHandler() {
        UtilsStore.setLoader(dispatch, true)
        AdminService.deleteStoFromCell(modalState.row)
            .then(() => {
                fillTable();
                onClose()
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    return (
        <BaseModal onClose={onClose}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <h2>Изменение ячейки: </h2>
                <h2>STO: <span style={{fontWeight: "bold"}}>{modalState.row.nameSto}</span></h2>

                <InputNumber style={{margin: 10, width: "100%"}} valueState={inputAmountState}/>
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

                <div>
                    <Button type="primary" size="large" onClick={saveHandler}>Сохранить</Button>
                    <Button style={{margin: 10}} type="primary" size="large" onClick={deleteHandler}>Удалить</Button>
                </div>
            </div>
        </BaseModal>
    );
};

export default ChangeCellAndRemainderModal;