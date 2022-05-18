import {sortString} from "../../utils/sortingFunctions";

export const cellColumns = [
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
    },
    {
        title: 'Номер ячейки',
        dataIndex: 'cellNumber',
        key: 'cellNumber',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        ellipsis: true,
    },
    {
        title: 'Примечания',
        dataIndex: 'note',
        key: 'note',
        ellipsis: true
    },
]