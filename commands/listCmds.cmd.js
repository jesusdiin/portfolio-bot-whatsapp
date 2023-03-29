import cmdSticker from './sticker.cmd.js';

const listCommands = {
	'!hi': console.log('hi'),
	'!sticker': cmdSticker,
	'!stk': cmdSticker,
	'!stkr': cmdSticker
};

export default listCommands;