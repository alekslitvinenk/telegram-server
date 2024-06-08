import "./types";
import {Users} from "./users";
import {useExpressJs} from "./server";
import {useTelegram} from "./telegram";

const users: Users = new Users()

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