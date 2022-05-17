export interface SelectedCell {
    cellNumber: number,
    side: string,
    status: StatusCell
}

export enum StatusCell {
    INSTALLED = "УСТАНОВЛЕНА",
    REMOVED = "СНЯТА"
}
