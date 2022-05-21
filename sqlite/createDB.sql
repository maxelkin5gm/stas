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
    operationDate           INTEGER,
    receivedNameSto         TEXT NOT NULL,
    receivedNameDetail      TEXT NOT NULL DEFAULT '',
    receivedOperationNumber TEXT NOT NULL DEFAULT '',
    cell_id                 INTEGER REFERENCES CELL (id),
    worker_id               INTEGER REFERENCES WORKER (id)
);



INSERT INTO STO (nameSto)
VALUES ('STO1');
INSERT INTO STO (nameSto)
VALUES ('STO2');

INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('DETAIL1', '1');
INSERT INTO DETAIL (nameDetail, operationNumber)
VALUES ('DETAIL2', '2');

INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (1, 1); -- sto1 detail1
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (1, 2); -- sto1 detail2
INSERT INTO STO_DETAIL (STO_ID, DETAIL_ID)
VALUES (2, 1); -- sto2 detail1

INSERT INTO CELL (stasIndex, side, cellNumber, status)
VALUES (1, 'ЛЕВО', 10, 'УСТАНОВЛЕНА');
INSERT INTO CELL (stasIndex, side, cellNumber, status)
VALUES (1, 'ПРАВО', 11, 'УСТАНОВЛЕНА');

INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (1, 1, 5); -- sto1 cell10 remainder5
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (1, 2, 2); -- sto1 cell11 remainder2
INSERT INTO STO_CELL (sto_id, cell_id, remainder)
VALUES (2, 1, 3); -- sto2 cell10 remainder3

INSERT INTO WORKER (nameWorker, personnelNumber)
VALUES ('WORKER1', '1');
INSERT INTO WORKER (nameWorker, personnelNumber)
VALUES ('WORKER1', '2');
INSERT INTO WORKER (nameWorker, personnelNumber)
VALUES ('WORKER2', '3');

INSERT INTO RECEIVED_STO (amount, receivedNameSto, receivedNameDetail, receivedOperationNumber, cell_id, worker_id)
VALUES (4, 'STO1', 'DETAIL1', '1', 1, 1);
INSERT INTO RECEIVED_STO (amount, receivedNameSto, receivedNameDetail, receivedOperationNumber, cell_id, worker_id)
VALUES (1, 'STO2', 'DETAIL2', '2', 2, 1);





