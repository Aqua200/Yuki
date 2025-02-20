import { WAMessageStubType } from '@whiskeysockets/baileys' import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) { if (!m.messageStubType || !m.isGroup) return true

let who = m.messageStubParameters[0] let taguser = @${who.split('@')[0]} let chat = global.db.data.chats[m.chat] let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg';

if (chat.welcome) { let img; try { let pp = await conn.profilePictureUrl(who, 'image'); img = await (await fetch(pp)).buffer(); } catch { img = await (await fetch(defaultImage)).buffer(); }

const bienvenidas = [
  `❀ *Bienvenido* a ${groupMetadata.subject}\n ✰ ${taguser}\n •(=^●ω●^=)• ¡Esperamos que te diviertas!\n> ✐ Usa *.menu* para ver los comandos.`,
  `☾ ¡Hola ${taguser}! ☽\n Bienvenido a *${groupMetadata.subject}*\n ◦✧ Que tu estancia sea placentera ✧◦\n> ✐ No olvides usar *.menu* para explorar.`,
  `✦ Bienvenido, ${taguser}! ✦\n Estás en *${groupMetadata.subject}*\n ✿ Disfruta tu estadía y respeta las normas ✿\n> ✐ Usa *.menu* para más info.`,
  `✿ ¡Un nuevo miembro ha llegado! ✿\n 🎉 Bienvenido ${taguser} a *${groupMetadata.subject}* 🎉\n ✐ ¡Explora con *.menu*!`
];

const despedidas = [
  `❀ *Adiós* de ${groupMetadata.subject}\n ✰ ${taguser}\n •(=^●ω●^=)• ¡Te esperamos pronto!\n> ✐ Usa *.menu* para ver los comandos.`,
  `☾ ${taguser} ha partido ☽\n ◦✧ Esperamos verte de nuevo en *${groupMetadata.subject}* ✧◦`,
  `✦ ${taguser} ha dejado el grupo ✦\n ✿ ¡Que te vaya bien! ✿`,
  `✿ Un miembro se ha ido ✿\n 🌸 ${taguser}, buena suerte en tu camino 🌸`
];

if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
  let bienvenida = bienvenidas[Math.floor(Math.random() * bienvenidas.length)];
  await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
} else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
  let bye = despedidas[Math.floor(Math.random() * despedidas.length)];
  await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
}

}

return true }

