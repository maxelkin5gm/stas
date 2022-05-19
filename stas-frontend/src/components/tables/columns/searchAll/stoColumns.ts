import {sortNumber, sortString} from "../../utils/sortingFunctions";

export const stoColumns = [
    {
        title: 'Обозначение СТО',
        dataIndex: 'nameSto',
        key: 'nameSto',
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