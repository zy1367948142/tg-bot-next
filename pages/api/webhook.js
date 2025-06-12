// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {createCommand} from "@/utils/commands/create";
import {bindCommand} from "@/utils/commands/bind";
import {unBindCommand} from "@/utils/commands/unbind";
import {balanceCommand} from "@/utils/commands/balance";
import {helpCommand} from "@/utils/commands/help";
import {sendMessage} from "@/utils/telegram";
import {groupCommand} from "@/utils/commands/group";

export const config = {
    maxDuration: 60,
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const chatId = req.body.message.chat.id;
        const text = req.body.message.text;
        const userId = req.body.message.from.id;
        console.log("----chatId----> ", chatId);
        console.log("----text---->", text);
        console.log("----userId---->", userId);
        if (text.startsWith("/start")) {
            await createCommand(chatId, userId)
        } else if (text.startsWith("/bind")) {
            await bindCommand(chatId, userId, text);
        } else if (text.startsWith("/unbind")) {
            await unBindCommand(chatId, userId, text);
        } else if (text.startsWith("/money")) {
            await balanceCommand(chatId, userId);
        } else if (text.startsWith("/help")) {
            await helpCommand(chatId);
        }
        res.status(200).send("OK")
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(500).send('Method Not Allowed');
    }
}