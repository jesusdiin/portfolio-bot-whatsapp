import generateAndSendAudio from './../modules/tts.module.js';


const ttsCmd = (client, message) => {

	const { type, id, from, caption, isMedia, mimetype, quotedMsg } = message;
	let { body } = message;

	const commands = caption || body || '';
	// eslint-disable-next-line no-unused-vars
	const command = commands.toLowerCase().split(' ')[0] || '';
	const args = commands.split(' ');	


	const dataText = body.slice(6);

	if (args.length === 1) return client.reply(from, 'Escribe el comando *!dime* y tu palabra a escuchar...');

	if (dataText.length > 500) return client.reply(from, 'Lo siento! El texto es demasiado largo', id);

	generateAndSendAudio(client, 'es', dataText, from, id);
};

export default ttsCmd;
