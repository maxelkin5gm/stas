import {sortNumber, sortString} from "../../utils/sortingFunctions";

export const receivedStoColumns = [
    {
        title: 'Обозначение СТО',
        dataIndex: 'sto',
        key: 'sto',
        sorter: sortString('sto')
    },
    {
        title: 'Выдано, шт.',
        dataIndex: 'received',
        key: 'received',
        sorter: sortNumber('received')
    },
    {
        title: 'Обозначение детали',
        dataIndex: 'detail',
        key: 'detail',
        sorter: sortString('detail')
    },
    {
        title: 'Номер операции',
        dataIndex: 'operationNumber',
        key: 'operationNumber',
        sorter: sortNumber('operationNumber')
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
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
