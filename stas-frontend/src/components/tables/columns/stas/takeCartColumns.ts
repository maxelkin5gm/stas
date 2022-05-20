import {sortNumber, sortString} from "../../utils/sortingFunctions";

export const takeCartColumns = [
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
    },
    {
        title: 'Сторона',
        dataIndex: 'side',
        key: 'side',
        sorter: {
            compare: sortString('side'),
            multiple: 3
        }
    },
    {
        title: 'Номер ячейки',
        dataIndex: 'cellNumber',
        key: 'cellNumber',
        sorter: {
            compare: sortNumber('cellNumber'),
            multiple: 2
        }
    },
    {
        title: 'Номер СТАС',
        dataIndex: 'stasIndex',
        key: 'stasIndex',
        sorter: {
            compare: sortNumber('stasIndex'),
            multiple: 1
        }
    }
];