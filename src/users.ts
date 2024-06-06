import {UserDataOpt} from "./types";
import {PoolConnection} from "mariadb";
import {pool} from "./pool";

export class Users {

    async lookupUser(telegramId: string, password: string): Promise<UserDataOpt> {
        let conn: PoolConnection;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(`SELECT * FROM users WHERE telegram_id = '${telegramId}' AND password  = '${password}'`);

            console.log(rows);
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.end();
        }

        return null
    }
}