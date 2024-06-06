import mariadb, {Pool} from "mariadb";

export const pool:Pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ichufef@5',
    database: 'telegram',
    connectionLimit: 5,
    rowsAsArray: true
});