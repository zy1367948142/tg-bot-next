import { sendMessage } from "../telegram";

export async function createCommand(chatId ,userId){
    //todo 根据userid创建数据库账号
    await sendMessage(chatId,"create")
}