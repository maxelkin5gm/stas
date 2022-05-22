import {sortNumber, sortString} from "../../utils/sortingFunctions";

export const receivedStoColumns = [
    {
        title: 'Обозначение СТО',
        dataIndex: 'receivedNameSto',
        key: 'receivedNameSto',
        sorter: sortString('receivedNameSto')
    },
    {
        title: 'Выдано, шт.',
        dataIndex: 'amount',
        key: 'amount',
        sorter: sortNumber('amount')
    },
    {
        title: 'Обозначение детали',
        dataIndex: 'receivedNameDetail',
        key: 'receivedNameDetail',
        sorter: sortString('receivedNameDetail')
    },
    {
        title: 'Номер операции',
        dataIndex: 'receivedOperationNumber',
        key: 'receivedOperationNumber',
        sorter: sortNumber('receivedOperationNumber')
    },
    {
        title: 'Дата',
        dataIndex: 'operationDate',
        key: 'operationDate',
        ellipsis: true,
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
        sorter: sortString('status'),
        ellipsis: true,
    },
    {
        title: 'Примечания',
        dataIndex: 'note',
        key: 'note',
        ellipsis: true
    },
];
