import {sortNumber, sortString} from "../../utils/sortingFunctions";

export const detailColumns = [
    {
        title: 'Обозначение детали',
        dataIndex: 'nameDetail',
        key: 'nameDetail',
    },
    {
        title: 'Номер операции',
        dataIndex: 'operationNumber',
        key: 'operationNumber',
    },
    {
        title: 'Обозначение СТО',
        dataIndex: 'nameSto',
        key: 'nameSto',
        sorter: sortString('nameSto')
    },
    {
        title: 'Остаток, шт.',
        dataIndex: 'remainder',
        key: 'remainder',
        sorter: sortString('remainder')
    },
    {
        title: 'Сторона',
        dataIndex: 'side',
        key: 'side',
        sorter: {
            compare: sortString('side'),
            multiple: 2
        }
    },
    {
        title: 'Номер ячейки',
        dataIndex: 'cellNumber',
        key: 'cellNumber',
        sorter: {
            compare: sortNumber('cellNumber'),
            multiple: 1
        }
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        ellipsis: true,
        sorter: sortString('status'),
    },
    {
        title: 'Примечания',
        dataIndex: 'note',
        key: 'note',
        ellipsis: true
    },
]