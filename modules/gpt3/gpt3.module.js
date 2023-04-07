import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import { MessageGpt } from './models/messageGpt.model.js';
import { ConversationGpt } from './models/conversationGpt.model.js';

// env
const uriMongo = process.env.MONGO_URI;
const apiKeyOpenAi = process.env.API_KEY_OPENAI;

mongoose.connect(uriMongo);

const db = mongoose.connection;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configGpt = new Configuration({
	apiKey: apiKeyOpenAi
});

const openai = new OpenAIApi(configGpt);

app.post('/message/:id', (req, res) => {
	if (req.params.id === 'new') {
		new ConversationGpt().save().then((conversationGpt) => {
			new MessageGpt({
				role: 'user',
				content: req.body.message.content,
				conversation: conversationGpt._id
			}).save().then(() => {
				openai.createChatCompletion({
					model: 'gpt-3.5-turbo',
					messages: [req.body.message]
				}).then((data) => {
					new MessageGpt({
						role: 'assistant',
						content: data.data.choices[0].message.content,
						conversation: conversationGpt._id
					}).save().then(() => {
						res.send({
							message: data.data.choices[0].message.content,
							conversation: conversationGpt._id
						});
					});
				});
			});
		});
	} else {
		ConversationGpt.findById(req.params.id).then((conversationGpt) => {
			MessageGpt.find({
				conversation: conversationGpt._id
			}).sort({timestamp: -1}).limit(5).then((messages) => {
				new MessageGpt({
					role: 'user',
					content: req.body.message.content,
					conversation: conversationGpt._id
				}).save().then(() => {
					openai.createChatCompletion({
						model: 'gpt-3.5-turbo',
						messages: [...messages.map((message) => {
							return {
								content: message.content,
								role: message.role
							};
						}).reverse(), req.body.message]
					}).then((data) => {
						new MessageGpt({
							role: 'assistant',
							content: data.data.choices[0].message.content,
							conversation: conversationGpt._id
						}).save().then(() => {
							res.send({
								message: data.data.choices[0].message.content
							});
						});
					});
				});
			});
		});
	}
});


app.get('/conversation/:id', (req, res) => {
	ConversationGpt.findById(req.params.id).then((conversationGpt) => {
		MessageGpt.find({
			conversation: conversationGpt._id
		}).then((messages) => {
			res.send(messages);
		});
	});
});


app.delete('/conversation/:id', (req, res) => {
	MessageGpt.deleteMany({
		conversation: req.params.id
	}).then(() => {
		ConversationGpt.findByIdAndDelete(req.params.id).then(() => {
			res.send('Conversation Delete [OK]');
		});
	});
});


app.listen(3000, () => {
	console.log('Server started on port 3000');
});