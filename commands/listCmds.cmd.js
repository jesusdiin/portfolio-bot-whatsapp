import cmdSticker from './sticker.cmd.js';
import ttsCmd from './tts.cmd.js';


const listCommands = {
	'!hi': console.log('hi'),
	'!sticker': cmdSticker,
	'!stk': cmdSticker,
	'!stkr': cmdSticker,
	'!dime': ttsCmd
};

export default listCommands;