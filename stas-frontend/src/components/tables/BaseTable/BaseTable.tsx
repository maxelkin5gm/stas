import React, {useState} from 'react';
import {Table} from "antd";

import RightClickModal from "../../modals/table/RightClickModal";
import "./BaseTable.css"

interface BaseTableProps {
    tableState: {
        columns: any[],
        data: any[]
    }
    onClickRow?: (row: any, index: number | undefined) => void
    onDoubleClickRow?: (row: any, index: number | undefined) => void
    isLoading?: boolean
}

const BaseTable = ({tableState, onClickRow, onDoubleClickRow, isLoading}: BaseTableProps) => {
    const [selectedRow, setSelectedRow] = useState(0)
    const [rightClickModalState, setRightClickModalState] = useState({
        visible: false,
        row: {} as any
    })

    function onRow(row: any, index: number | undefined) {
        return {
            onClick: () => {
                if (onClickRow) {
                    setSelectedRow(row.key)
                    onClickRow(row, index)
                }
            },
            onDoubleClick: () => {
                if (onDoubleClickRow) {
                    onDoubleClickRow(row, index)
                }
            },
            onContextMenu: (e: any) => {
                e.preventDefault()
                setRightClickModalState({row, visible: true})
            }
        };
    }


    return (
        <>
            <Table
                tableLayout={"auto"}
                pagination={false}
                size={"small"}

                dataSource={tableState.data}
                columns={tableState.columns}

                loading={isLoading}
                rowSelection={{type: "radio", selectedRowKeys: [selectedRow]}}
                onRow={onRow}
            />

            {rightClickModalState.visible
                ? <RightClickModal modalState={rightClickModalState}
                                   onClose={() => setRightClickModalState({
                                       ...rightClickModalState,
                                       visible: false
                                   })}/> : null}
        </>
    );
};

export default BaseTable;