import mongoose from 'mongoose';

const messageGptSchema = new mongoose.Schema({
	conversation: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ConversationGpt',
		required: true,
	},
	role: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now(),
		required: false
	}
});

export const MessageGpt = mongoose.model('MessageGpt', messageGptSchema);