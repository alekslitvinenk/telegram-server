import {Pool, PoolConnection} from "mariadb";

export class Chats {
    private readonly pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool
    }

    async addChat(id: number, name: string) {
        let conn: PoolConnection;

        try {
            conn = await this.pool.getConnection();
            const rows = await conn.query("INSERT IGNORE INTO chats (telegram_id, first_name) VALUES (?, ?)", [id, name]);
            console.log(rows);
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) await conn.end();
        }
    }
}