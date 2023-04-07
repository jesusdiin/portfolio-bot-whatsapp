import mongoose from 'mongoose';

const conversationGptSchema = new mongoose.Schema();

export const ConversationGpt = mongoose.model('ConversationGpt', conversationGptSchema);
