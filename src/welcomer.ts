import {Context, Telegraf} from "telegraf";
import {CommandContextExtn} from "telegraf/typings/telegram-types";
import {Chats} from "./chats";

function isAdmin(id: number): boolean {
    return id === 772950289
}

export class Welcomer {
    private readonly token: string;
    private readonly chats: Chats;
    private readonly bot: Telegraf<Context>

    constructor(token: string, chats: Chats) {
        this.token = token;
        this.chats = chats;

        const bot: Telegraf<Context> = new Telegraf(this.token)
        bot.start(this.handleStartCommand.bind(this))
        bot.command('adminhello', this.handleAdminHelloCommand.bind(this))
        bot.help((ctx) => ctx.reply('Send me a sticker'))
        bot.launch()

        this.bot = bot
    }

    close(): void {
        this.bot.stop('SIGINT')
    }

    private handleStartCommand(ctx: Context): void {
        const firstName = ctx.from.first_name
        const telegramID = ctx.from.id

        this.chats.addChat(telegramID, firstName)

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

    private handleAdminHelloCommand(ctx: Context & CommandContextExtn): void {
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
}

export const useWelcomer = (token: string, chats: Chats) => {
    return new Welcomer(token, chats)
}