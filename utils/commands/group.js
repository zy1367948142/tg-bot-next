import { sendMessage } from "../telegram";

export async function groupCommand(chatId){
    await sendMessage(chatId,"pong")
}