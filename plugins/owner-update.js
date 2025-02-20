import { exec } from 'child_process';

let handler = async (m, { conn }) => { m.reply(✨🌸 Actualizando a la versión más reciente... ¡Espera un momento! 🌸✨);

exec('git pull', (err, stdout, stderr) => { if (err) { conn.reply(m.chat, ❌ Oops... ¡Hubo un error al actualizar! 🛑 Razón: ${err.message}, m); return; }

if (stderr) {
  console.warn('⚠️ Advertencia durante la actualización:', stderr);
}

if (stdout.includes('Already up to date.')) {
  conn.reply(m.chat, `💖✨ Tu bot ya está actualizado a la última versión. ¡Todo está en orden! ✨💖`, m);
} else {
  conn.reply(m.chat, `🎀✨ ¡Actualización completada con éxito! ✨🎀

${stdout}`, m); } }); };

handler.help = ['update']; handler.tags = ['owner']; handler.command = ['update']; handler.rowner = true;

export default handler;
