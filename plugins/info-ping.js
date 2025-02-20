const { performance } = require('perf_hooks');

let handler = async (m, { conn, rcanal, text }) => { let startTime = performance.now();

// ⏱️ Medir la latencia
let endTime = performance.now();
let latency = (endTime - startTime).toFixed(4);

// 🌸 URL personalizada si el usuario la proporciona
let url = text || "https://qu.ax/wmgKA.jpg"; // Imagen por defecto

// 🌸 Respuesta kawaii con nombre de bot y opción de menú
let response = `

┏━━━✦ ❀ ✦━━━┓ ┃  💕 A-aquí tienes...
┃  📡 Velocidad: ${latency} ms...
*┃  💖 Soy 🦋𝐀𝐧𝐢𝐤𝐚-𝐒𝐭𝐞𝐥𝐥𝐚✨..
┃  ✨ Quieres ver mi menú? Usa .menu
┗━━━✦ ❀ ✦━━━┛
﹕E-espero que esté bien... (>///<)
`;

await conn.sendFile(m.chat, url, "latency.jpg", response, m, rcanal);

};

handler.help = ['ping']; handler.tags = ['info']; handler.command = ['ping']; handler.register = true;

module.exports = handler;
