import {UserDataOpt} from "./types";
import {PoolConnection} from "mariadb";
import {pool} from "./pool";
import {getNewToken} from "./utils";

export class Users {

    async lookupUser(telegramId: string): Promise<UserDataOpt> {
        let conn: PoolConnection;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(`SELECT * FROM users WHERE telegram_id = '${telegramId}'`);
            console.log(rows);

            if (rows.length > 0) {
                return {
                    telegramID: rows[0].telegram_id,
                    password: rows[0].password,
                    createdAt: rows[0].created,
                    token: rows[0].token
                }
            } else {
                return null
            }
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) await conn.end();
        }
    }

    async registerUser(telegramId: string, password: string): Promise<UserDataOpt> {
        let conn: PoolConnection;

        try {
            conn = await pool.getConnection();
            const rows = await conn.query("INSERT INTO users (telegram_id, password, token) VALUES (?, ?, ?)", [telegramId, password, getNewToken()]);
            console.log(rows);

            return this.lookupUser(telegramId)
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) await conn.end();
        }
    }
}