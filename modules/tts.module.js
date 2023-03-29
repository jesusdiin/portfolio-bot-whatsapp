import gtts from 'node-gtts';
import fs from 'fs';

const generateAndSendAudio = (client, languaje, text, from, id, callback) => {
	const tts = gtts(languaje);
	const gttsFilePath = `./temp/gtts/${id}.mp3`;

	tts.save(gttsFilePath, text, () => {
		client.sendPtt(from, gttsFilePath);
		console.log(`Audio ${id}.mp3 enviado correctamente! [OK]`);
		fs.unlink(gttsFilePath, () => {
			console.log('\nDeleted [OK]');
			if (callback) {
				callback();
			}
		});
	});
};

export default generateAndSendAudio;

