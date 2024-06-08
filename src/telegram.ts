import {Context, Telegraf} from "telegraf";
import {CommandContextExtn} from "telegraf/typings/telegram-types";

const isAdmin = (id: number) => {
    return id === 772950289
}

const handleStartCommand = (ctx: Context) => {
    const firstName = ctx.from.first_name
    const telegramID = ctx.from.id
    console.log(`Message from telegram ${firstName} ${telegramID} ${ctx.chat.id}`)

    ctx.reply(`Hello, ${firstName}!`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Join our community!",
                        url: `https://welcomer.libra-move.com?name=${firstName}&id=${telegramID}`
                    }
                ]
            ]
        }
    });
}

const handleAdminHelloCommand = (ctx: Context & CommandContextExtn) => {
    const telegramID = ctx.from.id

    if (isAdmin(telegramID)) {
        const args = ctx.payload

        if (args.split(" ").length > 1) {
            console.log('Please provide valid telegramID!')
            ctx.reply('Please provide valid telegramID!')
        } else {
            if (args.length > 0) {
                // @ts-ignore
                ctx.sendMessage("Hello from admin!", {chat_id: ctx.payload})
            } else {
                console.log('Please provide valid telegramID!')
                ctx.reply('Please provide valid telegramID!')
            }
        }
    } else {
        console.log('Sorry, only admins can use this command!')
        ctx.reply('Sorry, only admins can use this command!')
    }
}

export const useTelegram = (token: string) => {

    const bot = new Telegraf(token)
    bot.start(handleStartCommand)
    bot.command('adminhello', handleAdminHelloCommand)
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.launch()

    return bot
}