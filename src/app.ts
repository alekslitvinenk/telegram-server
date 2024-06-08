import "./types";
import {Users} from "./users";
import {useExpressJs} from "./server";
import mariadb from "mariadb";
import {useWelcomer} from "./welcomer";
import {Chats} from "./chats";

const mariadbPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    connectionLimit: 5,
});

const users: Users = new Users(mariadbPool)

const chats = new Chats(mariadbPool)
const app = useExpressJs(3000, users)
const bot = useWelcomer(process.env.BOT_TOKEN, chats)

const shutdown = (reason: string) => {
    console.log("Stopping server because of : ", reason);
    app.close()
    bot.close()
}

// Enable graceful stop
process.once('SIGINT', () => shutdown('SIGINT'))
process.once('SIGTERM', () => shutdown('SIGTERM'))