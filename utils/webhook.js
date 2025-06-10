// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//Webhook 请求

import { createCommand } from "@/tg/commands/create";
import { helpCommand } from "@/tg/commands/help";
import { bindCommand } from "@/tg/commands/bing";
import { sendMessage } from "@/tg/telegram";

export const config = {
    maxDuration: 60,
};

export default async function handler(req, res) {
    if (req.method=="POST") {
        const chatId = req.body.message.chat.id;
        const text = req.body.message.text;

        console.log("----ChatID-----> ", chatId);
        console.log("----Text----->", text);
        console.log("----userid----->", req.body.message.use.id);

        if (text.startsWith("/start")) {
            await helpCommand(chatId)
        }
        else if (text.startsWith("/bind")){
            await bindCommand(chatId);
        }
        else if (text.startsWith("/create")) {
            await createCommand(chatId);
        }
        else if (text.startsWith("/help")){
            await helpCommand(chatId);
        }
        else {
            await sendMessage(chatId,text);
        }
        res.status(200).send("OK")
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(500).send('Method Not Allowed');
    }
}