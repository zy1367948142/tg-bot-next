import { sendMessage } from "../telegram";

export async function startCommand(chatId){
    await sendMessage(chatId,"pong")
}