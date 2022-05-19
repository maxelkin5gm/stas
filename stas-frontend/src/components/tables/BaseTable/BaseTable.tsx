import React, {useState} from 'react';
import {Table} from "antd";

import "./BaseTable.css"

interface BaseTableProps {
    tableState: {
        columns: any[],
        data: any[]
    }
    onClickRow?: (row: any, index: number | undefined) => void
    onDoubleClickRow?: (row: any, index: number | undefined) => void
    onContextMenuRow?: (row: any, index: number | undefined) => void
    isLoading?: boolean
}

const BaseTable = ({tableState, onClickRow, onDoubleClickRow, onContextMenuRow, isLoading}: BaseTableProps) => {
    const [selectedRow, setSelectedRow] = useState(0)


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
                if (onContextMenuRow) {
                    onContextMenuRow(row, index)
                }
            }
        };
    }


    return (
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
    );
};

export default BaseTable;