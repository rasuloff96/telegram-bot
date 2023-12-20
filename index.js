const TelegramBot = require('node-telegram-bot-api')
const { gameOptions, againOptions, sectionOptions } = require("./options")

const token = '6627868309:AAGAS1J11O8LQ5OJtGK_XeaOOU2cniU3Grg'

const bot = new TelegramBot(token, { polling: true })

const obj = {}

const startGame = async (chatId) => {
    await bot.sendMessage(
        chatId,
        "Men 0 dan 9 gacha raqam o'yladim.Osha raqamni topishga xarakat qilib ko'ring !!!")

    const randomNumber = Math.floor(Math.random() * 10);
    obj[chatId] = randomNumber;
    await bot.sendMessage(
        chatId,
        "Omadingizni sinaab koring !!!",
        gameOptions)
}

const bootstrap = () => {

    bot.setMyCommands([
        {
            command: "/start",
            description: "Ishga tushurish."
        },
        {
            command: "/bolimlar",
            description: "Bo'limlar haqida malumot"
        },
        {
            command: "/info",
            description: "Foydalanuvchi haqida malumot."
        },
        {
            command: "/game",
            description: "O'yin o'ynash"
        },
        {
            command: "/interwievs",
            description: "Interwiev savollar."
        }
    ])

    bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === "/start") {
            // await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp")
            return await bot.sendMessage(
                chatId,
                "Assalomu alaykum!!! Asil_dev botiga hush kelibsiz! 🖐"
            )
        }

        if (text === "/bolimlar") {
            return await bot.sendMessage(
                chatId,
                "Bo'limlar:",
                sectionOptions
            )
        }

        if (text === "/info") {
            return await bot.sendMessage(chatId,
                `Username: ${msg.from?.username},
First_Name: ${msg.from?.first_name},
Last_name: ${msg.from?.last_name},
Language: ${msg.from?.language_code}
    `
            )
        }

        if (text === "/game") {
            return startGame(chatId)
        }

        if (text === "Salom" || text === "salom" || text === "Hello" || text === "hello" || text === "hi") {
            return await bot.sendMessage(chatId, "Valaykum Assalom !!!")
        }

        bot.sendMessage(chatId, `Uzur men sizni tushunmadim ):`)

        if (text === "/interwievs") {
            return await bot.sendMessage(
                chatId,
                "1 - Camalecase nima?"
            )
        } else {
            return bot.sendMessage(chatId, `${text}`)
        }

    })

    bot.on("callback_query", (msg) => {
        const data = msg.data
        const chatId = msg.message.chat.id

        if (data === "/again") {
            return startGame(chatId)
        }

        if (data == obj[chatId]) {
            return bot.sendMessage(
                chatId,
                `Tabriklayman yashirin raqamimni topdingiz🎉.Yashirin raqam: ${obj[chatId]}`,

            )
        } else {
            return bot.sendMessage(
                chatId,
                `): Men ${obj[chatId]} ni o'ylagan edim.Siz ${data} ni tanladingiz.`,
                againOptions
            )
        }

    })

}

bootstrap()