import {Telegraf} from "telegraf";
import {message} from "telegraf/filters";

export const useTelegram = (token: string) => {

    const bot = new Telegraf(token)
    bot.start((ctx) => ctx.reply('Welcome'))
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    bot.launch()

    return bot
}