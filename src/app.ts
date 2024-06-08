import "./types";
import {Users} from "./users";
import {useExpressJs} from "./server";
import {useTelegram} from "./telegram";
import mariadb from "mariadb";

const mariadbPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    connectionLimit: 5,
});

const users: Users = new Users(mariadbPool)

const app = useExpressJs(3000, users)
const bot = useTelegram(process.env.BOT_TOKEN)

const shutdown = (reason: string) => {
    console.log("Stopping server because of : ", reason);
    app.close()
    bot.stop('SIGINT')
}

// Enable graceful stop
process.once('SIGINT', () => shutdown('SIGINT'))
process.once('SIGTERM', () => shutdown('SIGTERM'))