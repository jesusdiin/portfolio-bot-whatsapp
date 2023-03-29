import defaultCmd from '../commands/defaultCmd.cmd.js';
import listCommands from '../commands/listCmds.cmd.js';

const msgResponses = async (client, message) => {

	try {
		// eslint-disable-next-line no-unused-vars
		const { type, id, from, caption, isMedia, mimetype, quotedMsg } = message;
		let { body } = message;

		const commands = caption || body || '';
		const command = commands.toLowerCase().split(' ')[0] || '';

		// eslint-disable-next-line no-unused-vars
		const msgs = (message) => {
			if (command.iniciaCon('!')) {
				if (message.length >= 10) {
					return `${message.substr(0,15)}`;
				} else {
					return `${message}`;
				}
			}
		};

		const comandos = listCommands[command] || defaultCmd;
		await comandos(client, message);


		// switch(command) {
		// case '!hi':
		// 	await client.reply(from, 'Holaaa', id);
		// 	break;
		// case '!sticker':
		// case '!stk':
		// case '!stkr':
		// 	await cmdSticker(client, message);
		// 	break;
		// default:
		// 	console.log('default');
		// }

	} catch (error) {
		console.log('[ERROR]', error);
	}
};

export default msgResponses;