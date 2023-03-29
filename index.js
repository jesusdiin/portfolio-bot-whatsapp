import {create, Client} from '@open-wa/wa-automate';
import options from './config/options.js';
import msgResponses from './messages/msgResponses.js';


const start = async (client = new Client()) => {
	console.log('========================\n[SERVER] Server Started!\n========================');

	client.onStateChanged((state) => {
		console.log('[Client State]', state);
		if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus();
	});

	client.onMessage((async (message) => {
		client.getAmountOfLoadedMessages()
			.then((msg) => {
				if (msg >= 3000) {
					client.cutMsgCache();
				}
			});
		msgResponses(client, message);
	}));
};

create(options(true, start))
	.then(client => start(client))
	.catch((error) => console.log(error));