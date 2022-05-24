PRAGMA foreign_keys = OFF;

DROP TABLE STO_DETAIL;
DROP TABLE STO_CELL;
DROP TABLE STO;
DROP TABLE DETAIL;
DROP TABLE CELL;
DROP TABLE WORKER;
DROP TABLE RECEIVED_STO;

PRAGMA foreign_keys = ON;

CREATE TABLE STO
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    nameSto TEXT NOT NULL UNIQUE
);

CREATE TABLE DETAIL
(
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nameDetail      TEXT NOT NULL,
    operationNumber TEXT NOT NULL,
    UNIQUE (nameDetail, operationNumber)
);

CREATE TABLE STO_DETAIL
(
    sto_id    INTEGER REFERENCES STO (id) ON DELETE CASCADE,
    detail_id INTEGER REFERENCES DETAIL (id) ON DELETE CASCADE,
    PRIMARY KEY (sto_id, detail_id)
);

CREATE TABLE CELL
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    stasIndex  INTEGER NOT NULL,
    side       TEXT    NOT NULL,
    cellNumber INTEGER NOT NULL,
    status     TEXT    NOT NULL,
    note       TEXT DEFAULT '',
    UNIQUE (stasIndex, side, cellNumber)
);

CREATE TABLE STO_CELL
(
    sto_id    INTEGER REFERENCES STO (id),
    cell_id   INTEGER REFERENCES CELL (id),
    remainder INTEGER NOT NULL,
    PRIMARY KEY (sto_id, cell_id)
);

CREATE TABLE WORKER
(
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nameWorker      TEXT        NOT NULL,
    personnelNumber TEXT UNIQUE NOT NULL
);

CREATE TABLE RECEIVED_STO
(
    id                      INTEGER PRIMARY KEY AUTOINCREMENT,
    amount                  TEXT NOT NULL,
    operationDate           TEXT NOT NULL default 'Отсутствует',
    receivedNameSto         TEXT NOT NULL,
    receivedNameDetail      TEXT NOT NULL DEFAULT '',
    receivedOperationNumber TEXT NOT NULL DEFAULT '',
    cell_id                 INTEGER REFERENCES CELL (id),
    worker_id               INTEGER REFERENCES WORKER (id)
);


-------------------------------------------------------------------------
INSERT INTO STO (nameSto)
VALUES ('НАПИЛЬНИК'); -- 1
INSERT INTO STO (nameSto)
VALUES ('ДРЕЛЬ'); -- 2
INSERT INTO STO (nameSto)
VALUES ('ПИЛА'); -- 3
INSERT INTO STO (nameSto)
VALUES ('ФРЕЗА'); -- 4
-------------------------------------------------------------------------
INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('БОЕГОЛОВКА', '90'); -- 1
INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('БОЕГОЛОВКА', '100'); -- 2
INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('БОЕГОЛОВКА', '110'); -- 3
INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('НАСОС', '90'); -- 4
INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('НАСОС', '110'); -- 5
INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('ГИРОСКОП', '100'); -- 6
INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('ГИРОСКОП', '110'); -- 7
-------------------------------------------------------------------------
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (1, 1); -- НАПИЛЬНИК БОЕГОЛОВКА 90
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (1, 2); -- НАПИЛЬНИК БОЕГОЛОВКА 100
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (1, 4); -- НАПИЛЬНИК НАСОС 90

INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (2, 1); -- ДРЕЛЬ БОЕГОЛОВКА 90
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (2, 3); -- ДРЕЛЬ БОЕГОЛОВКА 110
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (2, 7); -- ДРЕЛЬ ГИРОСКОП 110

INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (3, 4); -- ПИЛА НАСОС 90
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (3, 1); -- ПИЛА БОЕГОЛОВКА 90

INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (4, 5); -- ФРЕЗА НАСОС 110
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (4, 2); -- ФРЕЗА БОЕГОЛОВКА 100
-------------------------------------------------------------------------
INSERT INTO CELL (stasIndex, side, cellNumber, status)
VALUES (1, 'ЛЕВО', 10, 'УСТАНОВЛЕНА'); -- 1
INSERT INTO CELL (stasIndex, side, cellNumber, status)
VALUES (1, 'ПРАВО', 10, 'УСТАНОВЛЕНА'); -- 2
INSERT INTO CELL (stasIndex, side, cellNumber, status)
VALUES (1, 'ЛЕВО', 11, 'УСТАНОВЛЕНА'); -- 3
INSERT INTO CELL (stasIndex, side, cellNumber, status)
VALUES (1, 'ПРАВО', 11, 'УСТАНОВЛЕНА'); -- 4
-------------------------------------------------------------------------
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (1, 1, 5); -- НАПИЛЬНИК 10ЛЕВО remainder5
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (1, 3, 2); -- НАПИЛЬНИК 11ЛЕВО remainder2

INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (2, 1, 3); -- ДРЕЛЬ CELL10ЛЕВО remainder1
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (2, 2, 3); -- ДРЕЛЬ CELL10ПРАВО remainder3

INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (3, 4, 7); -- ПИЛА CELL11ПРАВО remainder7
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (3, 3, 9); -- ПИЛА CELL11ЛЕВО remainder9

INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (4, 1, 5); -- ФРЕЗА CELL11ПРАВО remainder5
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (4, 2, 6); -- ФРЕЗА CELL11ЛЕВО remainder6
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (4, 3, 7); -- ФРЕЗА CELL11ЛЕВО remainder7
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (4, 4, 8); -- ФРЕЗА CELL11ЛЕВО remainder8
-------------------------------------------------------------------------
INSERT INTO WORKER (nameWorker, personnelNumber)
VALUES ('ЕЛЬКИН М.В.', '1111'); -- 1
INSERT INTO WORKER (nameWorker, personnelNumber)
VALUES ('АНДРЕЕВА Н.Д.', '2222'); -- 2
INSERT INTO WORKER (nameWorker, personnelNumber)
VALUES ('ЛОГИНОВ Н.В.', '3333'); -- 3
-------------------------------------------------------------------------
INSERT INTO RECEIVED_STO (amount, receivedNameSto, receivedNameDetail, receivedOperationNumber, cell_id, worker_id)
VALUES (3, 'НАПИЛЬНИК', 'БОЕГОЛОВКА', '100', 1, 1);
INSERT INTO RECEIVED_STO (amount, receivedNameSto, receivedNameDetail, receivedOperationNumber, cell_id, worker_id)
VALUES (1, 'ДРЕЛЬ', 'ГИРОСКОП', '110', 2, 1);
-------------------------------------------------------------------------




