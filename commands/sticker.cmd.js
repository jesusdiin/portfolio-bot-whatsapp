import { decryptMedia } from '@open-wa/wa-automate';

// libs
import { isUrl, uaOverride } from './../libs/constWhatsApp.lib.js';


const cmdSticker = async (client, message) => {

	const { type, id, from, caption, isMedia, mimetype, quotedMsg } = message;
	let { body } = message;

	const commands = caption || body || '';
	// eslint-disable-next-line no-unused-vars
	const command = commands.toLowerCase().split(' ')[0] || '';
	const args = commands.split(' ');

	if(isMedia && type === 'image') {
		const mediaData = await decryptMedia(message, uaOverride);
		const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
		await client.sendImageAsSticker(from, imageBase64);
	} else if (quotedMsg && quotedMsg.type == 'image') {
		const mediaData = await decryptMedia(quotedMsg, uaOverride);
		const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
		await client.sendImageAsSticker(from, imageBase64);			
	} else if (args.length === 2) {
		const url = args[1];
		if (url.match(isUrl)) {
			await client.sendStickerfromUrl(from, url, {method: 'get'})
				.catch(err=>console.log('Error: ', err));
		}
	} else {
		client.reply(from, 'Error', id);
	}
};

export default cmdSticker;